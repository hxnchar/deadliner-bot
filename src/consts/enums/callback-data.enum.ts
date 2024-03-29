enum CALLBACK_DATA {
  SPLIT_SYMBOL = '_',

  SUBJECT_CHANGE_NAME = 'SUBJECT_CHANGE_NAME',
  SUBJECT_MAKE_GENERAL = 'SUBJECT_MAKE_GENERAL',
  SUBJECT_MAKE_NON_GENERAL = 'SUBJECT_MAKE_NON_GENERAL',
  SUBJECT_UNDO = 'SUBJECT_UNDO',
  SUBJECT_REDO = 'SUBJECT_REDO',

  LINK_SUBJECT = 'LINK_SUBJECT',
  REMOVE_SUBJECT = 'REMOVE_SUBJECT',
  DISCARD_PEEK_SUBJECT = 'DISCARD_PEEK_SUBJECT',

  SUBJECT_SWITCH_PERSONAL = 'SUBJECT_SWITCH_PERSONAL',
  SUBJECT_SAVE_PERSONAL_LIST = 'SUBJECT_SAVE_PERSONAL_LIST',

  NOTIFICATION_CHANGE_HEADER = 'NOTIFICATION_CHANGE_HEADER',
  NOTIFICATION_CHANGE_BODY = 'NOTIFICATION_CHANGE_BODY',
  NOTIFICATION_CHANGE_DATE = 'NOTIFICATION_CHANGE_DATE',
  NOTIFICATION_CHANGE_DEADLINE = 'NOTIFICATION_CHANGE_DEADLINE',
  NOTIFICATION_SET_SUBJECT = 'NOTIFICATION_SET_SUBJECT',
  NOTIFICATION_SET_REQUIRED = 'NOTIFICATION_SET_REQUIRED',
  NOTIFICATION_SET_DISPENSABLE = 'NOTIFICATION_SET_DISPENSABLE',

  SETTINGS_SUBJECTS = 'SETTINGS_SUBJECTS',
  SETTINGS_CALENDAR = 'SETTINGS_CALENDAR',
  SETTINGS_LANGUAGE = 'SETTINGS_LANGUAGE',
  SETTINGS_REMINDERS = 'SETTINGS_REMINDERS',
  SETTINGS_SET_LANGUAGE = 'SETTINGS_SET_LANGUAGE',
  SETTINGS_SET_CALENDAR_ID = 'SETTINGS_SET_CALENDAR_ID',

  DEADLINE_CHANGE_TASK = 'DEADLINE_CHANGE_TASK',
  DEADLINE_CHANGE_DATE = 'DEADLINE_CHANGE_DATE',
  DEADLINE_SET_SUBJECT = 'DEADLINE_SET_SUBJECT',

  DISCARD_REMINDER_TYPE = 'DISCARD_REMINDER_TYPE',
  REMINDER_TYPE = 'REMINDER_TYPE',
  BOT = 'BOT',
  CALENDAR = 'CALENDAR',
  EMAIL = 'EMAIL',

  SAVE = 'SAVE',
  DISCARD = 'DISCARD',
  RESET = 'RESET',
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  DELETE = 'DELETE',
  CONFIRM = 'CONFIRM',

  DECREASE = 'DECREASE',
  INCREASE = 'INCREASE',

  YEARS = 'YEARS',
  MONTHS = 'MONTHS',
  WEEKS = 'WEEKS',
  DAYS = 'DAYS',
  HOURS = 'HOURS',
  MINUTES = 'MINUTES',
  SECONDS = 'SECONDS',
}

export { CALLBACK_DATA };
