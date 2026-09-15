# Window Orders — заказы на замену окон

Тестовое мобильное приложение на React Native, Expo и TypeScript для управления заказами на замену окон.

## Возможности

- список заказов из локального JSON-файла;
- фильтрация по статусам: «Новый», «В работе», «Завершён»;
- экран с полной информацией о заказе;
- циклическая смена статуса заказа;
- создание нового заказа с проверкой обязательных полей;
- выбор типа окна из четырёх вариантов;
- доступные подписи для интерактивных элементов и ошибок формы;
- типизированная навигация между экранами;
- единое состояние приложения через React Context и `useReducer`.

## Требования

- Node.js 20 или новее;
- npm 10 или новее;
- Expo Go на мобильном устройстве либо iOS/Android Simulator.

## Установка и запуск

```bash
npm install
npm start
```

После запуска:

- нажмите `i`, чтобы открыть приложение в iOS Simulator;
- нажмите `a`, чтобы открыть его в Android Emulator;
- либо отсканируйте QR-код через Expo Go на мобильном устройстве.

## Проверка проекта

```bash
npm run typecheck
npm run lint
npm run export
```

Проект проверен на iPhone 16 Pro Simulator с iOS 18.3 и Expo SDK 57. Протестированы фильтрация заказов, переходы между экранами, циклическая смена статуса, валидация формы и добавление нового заказа. Экспорт для iOS и Android выполняется без ошибок.

Последняя полная проверка проекта: 15 сентября 2026 года.

## Структура

- `src/screens` — экраны приложения;
- `src/components` — переиспользуемые компоненты интерфейса;
- `src/store` — состояние и действия с заказами;
- `src/navigation` — навигация и типы маршрутов;
- `src/data` — локальные тестовые данные;
- `src/types` — типы предметной области;
- `src/utils` — форматирование и логика статусов;
- `src/theme` — цвета и настройки оформления.

## Примечания

Согласно условиям тестового задания, данные хранятся в памяти приложения. Новый заказ добавляется в начало списка со статусом «Новый».

Статусы меняются по кругу:

`Новый → В работе → Завершён → Новый`.

Архитектура разделяет интерфейс, состояние и предметную логику, поэтому позже можно подключить API или постоянное хранилище без переработки экранов.

---

# Window Orders

A React Native, Expo, and TypeScript assessment app for managing window replacement orders.

## Features

- order list loaded from local JSON data;
- filtering by New, In progress, and Completed statuses;
- detailed order screen;
- cyclic order status transition;
- validated order creation form;
- four available window types;
- accessible labels for interactive controls and form errors;
- typed stack navigation;
- centralized state with React Context and `useReducer`.

## Requirements

- Node.js 20 or newer;
- npm 10 or newer;
- Expo Go on a mobile device, or an iOS/Android simulator.

## Install and run

```bash
npm install
npm start
```

Then press `i` for iOS Simulator, `a` for Android Emulator, or scan the QR code with Expo Go.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run export
```

The project was verified on an iPhone 16 Pro Simulator running iOS 18.3 with Expo SDK 57. Order filtering, screen navigation, cyclic status updates, form validation, and new order creation were tested. Both iOS and Android exports complete successfully.

Last full project verification: September 15, 2026.

## Implementation notes

As required by the assessment, data is stored in memory. Newly created orders are added to the top of the list with the `New` status.

Status transitions follow this cycle:

`New → In progress → Completed → New`.

The UI, state management, and domain logic are separated so an API or persistent storage can be introduced without rewriting the screens.
