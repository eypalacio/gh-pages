import { createReducer, on } from "@ngrx/store";
import { Notification } from "src/app/core/interface/notification.model";
import { addNotification, deleteOldNotification } from "../actions/notifications.action";

export const initialState: ReadonlyArray<Notification> = []

export const notificationReducer = createReducer(initialState,
    on(addNotification, (oldState, { notifications }) => { return [...oldState, notifications] }),
    on(deleteOldNotification, (oldState, { id }) => { return oldState.filter(e => e.id !== id) }),
)