import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import {
  XMarkIcon,
  ForwardIcon,
  HomeIcon,
  DocumentPlusIcon,
  DocumentArrowDownIcon,
  PencilSquareIcon,
  TableCellsIcon,
  PencilIcon,
  CheckBadgeIcon
} from '@heroicons/vue/24/solid'
import {
  PlusCircleIcon,
  SquaresPlusIcon,
  TrashIcon,
  Cog8ToothIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon
} from '@heroicons/vue/24/outline'

import App from './App.vue'
import router from './router'
import './utils/appwrite'

const app = createApp(App)

app.component('XMarkIcon', XMarkIcon)
app.component('ForwardIcon', ForwardIcon)
app.component('PlusCircleIcon', PlusCircleIcon)
app.component('SquaresPlusIcon', SquaresPlusIcon)
app.component('HomeIcon', HomeIcon)
app.component('TrashIcon', TrashIcon)
app.component('Cog8ToothIcon', Cog8ToothIcon)
app.component('XCircleIcon', XCircleIcon)
app.component('DocumentPlusIcon', DocumentPlusIcon)
app.component('DocumentArrowDownIcon', DocumentArrowDownIcon)
app.component('PencilSquareIcon', PencilSquareIcon)
app.component('TableCellsIcon', TableCellsIcon)
app.component('PencilIcon', PencilIcon)
app.component('ExclamationTriangleIcon', ExclamationTriangleIcon)
app.component('CheckBadgeIcon', CheckBadgeIcon)
app.component('PlusIcon', PlusIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
