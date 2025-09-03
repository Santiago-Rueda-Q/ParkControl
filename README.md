🚗 ParkControl
Vue 3
Vite
TailwindCSS
PrimeVue
Flowbite

📖 Description
ParkControl is a web-based parking management application, developed with Vue 3 + Vite using TailwindCSS, PrimeVue, and Flowbite.
It follows a clean architecture (Domain, Infrastructure, Services, Views) and currently uses localStorage for data persistence.

Its modular design makes it easy to replace local storage with a real API in the future.

✨ Main Features
🔑 Vehicle entry with validations and capacity control.
🚪 Vehicle exit with license plate search and invoice generation.
🅿 Parking slot management by vehicle categories.
👥 Client management with full CRUD and real-time search.
📊 Dashboard and reports (reserved space for metrics and statistics).
⚙ Configuration of rates and parking map.
📂 Estructura del proyecto
├── 📁 .git/             🚫 (oculto)
├── 📁 .vscode/          🚫 (config local)
├── 📁 ParkControl/
│   ├── 🌐 index.html
│   ├── 📄 script.js
│   └── 🎨 styles.css
├── 📁 node_modules/     🚫 (auto-generado)
├── 📁 public/
│   └── 🖼 vite.svg
├── 📁 src/
│   ├── 📁 Domain/       # Contratos (interfaces)
│   │   ├── 📁 Clients/
│   │   │   └── 📄 ClientsRepository.js
│   │   ├── 📁 Entries/
│   │   │   └── 📄 EntriesRepository.js
│   │   ├── 📁 Exits/
│   │   │   └── 📄 ExitsRepository.js
│   │   ├── 📁 Map/
│   │   │   └── 📄 MapRepository.js
│   │   └── 📁 Slots/
│   │       ├── 📄 SlotsRepository.js
│   │       └── 📄 categories.js
│   ├── 📁 Infrastructure/   # Implementaciones concretas (localStorage)
│   │   ├── 📁 Clients/
│   │   │   └── 📄 LocalClientsRepository.js
│   │   ├── 📁 Entries/
│   │   │   └── 📄 LocalEntriesRepository.js
│   │   ├── 📁 Exits/
│   │   │   └── 📄 LocalExitsRepository.js
│   │   ├── 📁 Map/
│   │   │   └── 📄 LocalMapRepository.js
│   │   └── 📁 Slots/
│   │       └── 📄 LocalSlotsRepository.js
│   ├── 📁 assets/
│   │   └── 🖼 vue.svg
│   ├── 📁 components/   # Componentes Vue reutilizables
│   │   ├── 📁 clients/
│   │   │   ├── 🟢 ClientForm.vue
│   │   │   ├── 🟢 ClientSearch.vue
│   │   │   └── 🟢 ClientTable.vue
│   │   ├── 📁 entries/
│   │   │   ├── 🟢 EntriesHeaderStats.vue
│   │   │   ├── 🟢 LocationCard.vue
│   │   │   ├── 🟢 ParkedTable.vue
│   │   │   └── 🟢 VehicleForm.vue
│   │   ├── 📁 exits/
│   │   │   └── 🟢 ExitSearch.vue
│   │   ├── 📁 map/
│   │   │   ├── 🟢 MapConfig.vue
│   │   │   └── 🟢 ParkingMap.vue
│   │   ├── 🟢 NavItem.vue
│   │   ├── 🟢 SidebarNav.vue
│   │   ├── 🟢 SlotCard.vue
│   │   └── 🟢 SlotsConfig.vue
│   ├── 📁 layouts/
│   │   └── 🟢 AppLayout.vue
│   ├── 📁 router/
│   │   └── 📄 index.js
│   ├── 📁 services/     # Casos de uso / lógica de negocio
│   │   ├── 📄 clients.service.js
│   │   ├── 📄 di.js
│   │   ├── 📄 entries.service.js
│   │   ├── 📄 exits.service.js
│   │   ├── 📄 fees.service.js
│   │   ├── 📄 map.service.js
│   │   ├── 📄 navigation.service.js
│   │   └── 📄 slots.service.js
│   ├── 📁 store/
│   ├── 📁 test/
│   ├── 📁 views/        # Vistas principales (pantallas)
│   │   ├── 📁 Client/
│   │   │   └── 🟢 ClientsView.vue
│   │   ├── 📁 Entries/
│   │   │   └── 🟢 EntriesView.vue
│   │   ├── 📁 Exits/
│   │   │   └── 🟢 ExitsView.vue
│   │   ├── 📁 Map/
│   │   │   └── 🟢 MapView.vue
│   │   ├── 📁 Rates/
│   │   │   └── 🟢 RatesView.vue
│   │   ├── 📁 Reports/
│   │   │   └── 🟢 ReportsView.vue
│   │   ├── 📁 Settings/
│   │   │   └── 🟢 SettingsView.vue
│   │   └── 📁 Slots/
│   │       └── 🟢 SlotsView.vue
│   ├── 🟢 App.vue
│   ├── 📄 main.js
│   └── 🎨 style.css
├── 🚫 .gitignore
├── 📖 README.md
├── 🌐 index.html
├── 📄 package-lock.json
├── 📄 package.json
└── 📄 vite.config.js
##🚀 Installation and execution

1. Clone repository
git clone https://github.com/usuario/ParkControl.git cd ParkControl

2. Install dependencies
npm install

3. Run in development mode
npm run dev

open in http://localhost:5173
4. Build for production
npm run build

##👥 Authors

Santiago Rueda Quintero
Eliecer Guevara Fuentes
Lisandro Rueda Thomas
