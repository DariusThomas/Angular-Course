import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from "@ngrx/effects"
import * as AuthActions from "./auth.actions"
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';


export interface AuthResponseData {
    king: string
    idToken: string,
    email: string,
    refreshToken: String,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

const handleAuthentication = (
    expiresIn: number,
    email: string,
    userId: string,
    token: string
) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate)
    localStorage.setItem("userData", JSON.stringify(user))
    return new AuthActions.AuthenticateSuccess({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expirationDate,
        redirect:true
    })
}

const handleError = (errorRes: any) => {

    let errorMessage = 'An unknown error has occured'
    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage))
    }
    switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = "This email exists already!"
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = "This email does not exist!"
            break;
        case "INVALID_PASSWORD":
            errorMessage = 'This password is not correct!'
        default:
            errorMessage = errorMessage
    }


    return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) { }

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap(
                    (resData) => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000)
                    }
                ),
                map(
                    resData => {

                        return handleAuthentication(
                            +resData.expiresIn,
                            resData.email,
                            resData.localId,
                            resData.idToken
                        )
                    }
                ),
                catchError(errorRes => {
                    return handleError(errorRes)
                }))
        })
    )
    // no need to call .subscribe() ngrx/effects will subscribe for youu
    //ngrx automatically dispatches this method aswell
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(
                    tap(
                        (resData) => {
                            this.authService.setLogoutTimer(+resData.expiresIn * 1000)
                        }
                    ),
                    map(
                        resData => {
                            return handleAuthentication(
                                +resData.expiresIn,
                                resData.email,
                                resData.localId,
                                resData.idToken
                            )
                        }
                    ),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    }))
        }),

    )


    //dispath false is for the login rerouting effect that doesnt return an action.
    //by default effects are expected to return an action
    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(
            AuthActions.AUTHENTICATE_Success
        ),
        tap(
            (AuthSucces:AuthActions.AuthenticateSuccess) => {
                if(AuthSucces.payload.redirect){
                this.router.navigate(['/'])
                }
            }
        ))


    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer()
            localStorage.removeItem("userData");
            this.router.navigate(['/auth'])
        })
    )

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'))
            if (!userData) {
                return { type: "Dummy Action" }
            }

            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
            )


            if (loadedUser.token) {
                // this.user.next(loadedUser)

                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() -
                 new Date().getTime()

                this.authService.setLogoutTimer(expirationDuration)
                return new AuthActions.AuthenticateSuccess(
                    {
                        email: loadedUser.email,
                        userId: loadedUser.id,
                        token: loadedUser.token,
                        expirationDate: new Date(userData._tokenExpirationDate),
                        redirect:false
                    })
                // const expirationDate = new Date(
                //     userData._tokenExpirationDate).getTime() - new Date().getTime()
                // this.autoLogout(expirationDate)
            }
            return { type: "Dummy Action" }
        })
    )
}