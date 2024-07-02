import { createAction, props } from "@ngrx/store";
import { Notification } from "src/app/core/interface/notification.model";

export const addNotification = createAction(
    '[CONTEO24 COMPONENT] add notifications',
    props<{ notifications: Notification}>()
)

export const deleteOldNotification = createAction(
    '[CONTEO24 COMPONENT] delete notifications',
    props<{ id: number}>()
)