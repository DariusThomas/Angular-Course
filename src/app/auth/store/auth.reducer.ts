import { User } from '../user.model';
import * as AuthActions from "../store/auth.actions"

export interface State{
    user:User,
    authError:string,
    loading:boolean
}

const initialState ={
    user:null,   //null as the starting value
    authError:null,
    loading:false
}

export function AuthReducer(
    state:State=initialState,
    action:AuthActions.AuthActions
){
    switch (action.type){
        case AuthActions.AUTHENTICATE_Success:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate,
                )
            return{
                ...state,
                authError:null,
                user:user,
                loading:false
            }
            break;
            case AuthActions.LOGOUT:
            return{
                ...state,
                user:null
            }
            break;
            case AuthActions.LOGIN_START:
                case AuthActions.SIGNUP_START:
                return{
                    ...state,
                    authError:null,
                    loading:true
                }
                break;
                case AuthActions.AUTHENTICATE_FAIL:
                    return{
                        ...state,
                        user:null,
                        authError:action.payload,
                        loading:false
                    }
                    break;
                    case AuthActions.CLEAR_ERROR:
                        return{
                            ...state,
                            authError:null
                        }
            default:
            return state
    }
   
}