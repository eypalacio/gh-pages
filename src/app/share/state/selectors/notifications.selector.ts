import { createFeatureSelector } from "@ngrx/store";
import { Notification } from "src/app/core/interface/notification.model";

export const selectNotification = createFeatureSelector<ReadonlyArray<Notification>>('notificationSelector')