
/**
 * The List of possible action that can occure between the client and the server.
 */
export enum Action {

    GET_ALL_PLAYERS_ACTION = "GET_STAT",
    GET_ALL_PLAYERS_RESPONSE = "GET_STAT_RESPONSE",
    AUTHENTICATE__RESPONSE = "AUTHENTICATE_RESPONSE",
    AUTHENTICATE = "AUTHENTICATE",
    SIGN_UP_RESPONSE = "REGISTER_USER_RESPONSE",
    SIGN_UP = "REGISTER_USER",
    GET_MAPPING_CONFIGURATION_RESPONSE = "GET_MAPPING_CONFIGURATION_RESPONSE",
    GET_MAPPING_CONFIGURATION = "GET_MAPPING_CONFIGURATION"

}
