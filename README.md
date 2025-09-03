# 🚗 ParkControl  

**Technologies:**  
- [Vue 3](https://vuejs.org/)  
- [Vite](https://vitejs.dev/)  
- [TailwindCSS](https://tailwindcss.com/)  
- [PrimeVue](https://primevue.org/)  
- [Flowbite](https://flowbite.com/docs/getting-started/vue/)  


## 📖 Description  

*ParkControl* is a web-based parking management application, developed with *Vue 3 + Vite* using *TailwindCSS, PrimeVue, and Flowbite*.  
It follows a *clean architecture* (Domain, Infrastructure, Services, Views) and currently uses *localStorage* for data persistence.  

Its modular design allows for an easy transition from local storage to a real API in the future.  

---

## ✨ Main Features  

- 🔑 *Vehicle entry* with validations and capacity control.  
- 🚪 *Vehicle exit* with license plate search and invoice generation.  
- 🅿 *Parking slot management* by vehicle categories.  
- 👥 *Client management* with full CRUD and real-time search.  
- 📊 *Dashboard and reports* (reserved space for metrics and statistics).  
- ⚙ *Configuration of rates and parking map*.  

---

## 📂 Project Structure  

```bash
├── 📁 .git/             🚫 (hidden)
├── 📁 .vscode/          🚫 (local config)
├── 📁 ParkControl/
│   ├── 🌐 index.html
│   ├── 📄 script.js
│   └── 🎨 styles.css
├── 📁 node_modules/     🚫 (auto-generated)
├── 📁 public/
│   └── 🖼 vite.svg
├── 📁 src/
│   ├── 📁 Domain/       # Contracts (interfaces)
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
│   ├── 📁 Infrastructure/   # Concrete implementations (localStorage)
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
│   ├── 📁 components/   # Reusable Vue components
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
│   ├── 📁 services/     # Use cases / business logic
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
│   ├── 📁 views/        # Main views (screens)
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
## 🚀 Installation & Execution  

```bash
git clone https://github.com/usuario/ParkControl.git && cd ParkControl && npm install && npm run dev

