import { ActionReducerMap } from "@ngrx/store";
import { Notification } from "src/app/core/interface/notification.model";
import { notificationReducer } from "./reducers/notifications.reducer";

export interface AppState {
    notificationSelector: ReadonlyArray<Notification>
}

export const ROOT_REDUCER: ActionReducerMap<AppState>={
    notificationSelector: notificationReducer
}