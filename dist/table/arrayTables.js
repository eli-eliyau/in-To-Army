"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.columnsName = exports.tablesName = void 0;
exports.tablesName = [
    "User",
    "Notification",
    "FoodType",
    "Ability",
    "Kennel",
    "Cell",
    "Dog",
    "Round",
    "RoundNote",
    "Pair",
    "Walking",
    "Food",
    "Cleaning",
    "MedicalTreatment",
    "MoveDog",
];
exports.columnsName = [
    ["id", "name", "role", "email", "roundResponsible", "group"],
    ["id", "userId", "notification", "date"],
    ["id", "foodType"],
    ["id", "ability"],
    ["id", "kennelName"],
    ["id", "kennelId", "cellName", "cellDescription"],
    [
        "id",
        "userId",
        "cellId",
        "foodTypeId",
        "abilityId",
        "name",
        "walkingNumber",
        "birthDate",
        "weight",
        "madness",
        "entryRules",
        "foodAmount",
        "status",
        "fit",
        "rest",
        "nextFeeding",
        "treatment",
        "nextFeedingDate",
    ],
    [
        "id",
        "userId",
        "time",
        "date",
        "number",
        "isdone",
        "isactive",
        "reporttime",
        "team",
    ],
    ["id", "note", "team", "number"],
    [
        "id",
        "dogId",
        "userId",
        "startDate",
        "endDate",
        "limitTimeMorning",
        "limitTimeEvening",
    ],
    ["id", "pairId", "isDone", "walkingDate", "isActive"],
    ["id", "pairId", "isDone", "feedingDate", "isActive"],
    [
        "id",
        "pairId",
        "isDone",
        "cleaningDate",
        "isActive",
    ],
    ["id", "pairId", "isDone", "medicineRecieved", "isActive"],
    ["id", "fromId", "toId", "sendDate", "dogId", "isActive"],
];
