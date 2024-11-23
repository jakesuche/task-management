<template>
  <div class="flex bg-gray-100 text-gray-900">
    <aside
      class="flex h-screen flex-col bg-white transition-all duration-300 ease-in-out fixed sm:relative"
      :class="`${!isCollapsed ? 'w-[4.8rem]' : 'w-52'}`"
    >
      <div
        :class="`${!isCollapsed ? 'isOpen' : 'isClose'}`"
        class="p-4 cursor-pointer flex items-center relative logo-container h-16 justify-between"
      >
        <transition name="fade-transform">
          <img
            class="h-8 w-8 logo"
            :class="`${!isCollapsed ? 'absolute' : ''}`"
            src="/assets/image/svg/logo.svg"
            alt="Logo"
          />
        </transition>

        <!-- Chevron Left Icon with transition -->
        <transition name="fade-transform">
          <Icon
            @click="toggleCollapse"
            :class="`${!isCollapsed ? 'absolute' : ' !opacity-100'}`"
            name="cv:toggle-nav"
            class="h-8 w-8 chevron"
          />
        </transition>
      </div>
      <nav class="flex flex-1 flex-col gap-y-4 pt-10 px-4">
       
        <NuxtLink
          :href="item.link"
          v-for="item in nav_items"
          :class="`${current_path.startsWith(item.link) && 'bg-[#6161f126]'}`"
          class="hover:bg-[#6161f126] p-[1.4rem] flex h-[32px] px-[12px] items-center relative group rounded-lg"
        >
          <div class="h-[20px] w-[20px] mr-[1px] justify-start flex-shrink-0 ">
            <Icon  :class="`${current_path.startsWith(item.link) && 'bg-[#625df5]'}`" class="flex nuxt-icon group-hover:bg-[#625df5]" size="20" :name="item.icon" />
          </div>

          <div
            class="flex-1 leading-[20px] flex overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-[#625df5]"
          >
            <span
            :class="`${current_path.startsWith(item.link) && 'text-[#625df5]'}`" 
              class="ml-2 block text-surface-600 text-[calc(1.75*0.5rem)] font-bold group-hover:text-[#625df5]"
              >{{ item.label }}</span
            >
          </div>
          <div
            v-if="!isCollapsed"
            class="absolute inset-y-0 left-12 hidden items-center group-hover:flex z-[999] smooth"
          >
            <div
              class="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg"
            >
              {{ item.label }}
            </div>
          </div>
        </NuxtLink>
      </nav>
    </aside>
  </div>
</template>

<script lang="ts" setup>
import { routes } from '~/utils/constants';



const router = useRouter();
const current_path = computed(()=>router.currentRoute.value.path);
const isCollapsed = ref(false);
import {nav_items} from '../../utils/constants'

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
}
</script>

<style scoped>


.nuxt-icon svg{
  fill: red;
}

.tooltip {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%) scale(0);
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  background-color: #000;
  color: #fff;
  white-space: nowrap;
  border-radius: 0.25rem;
  transition: transform 0.3s ease;
  z-index: 9999;
}

.sidebar-container {
  display: flex;
  transition: all 0.3s ease-in-out;
  width: 4.5rem; /* Width when collapsed */
}

.sidebar-container.expanded {
  width: 16rem; /* Width when expanded */
}

.sidebar-container.collapsed {
  width: 4.5rem; /* Width when collapsed */
}

.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-transform-enter-from,
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.fade-transform-leave-from,
.fade-transform-enter-to {
  opacity: 1;
  transform: translateX(0);
}

/* Fade transition for the sidebar title and labels */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}

/* Hover effect for showing the chevron and hiding the logo */
.isClose:hover .chevron {
  opacity: 1 !important;
  transition: opacity 0.3s ease;
}

.isClose .chevron {
  opacity: 0 !important;
}

.isOpen:hover .logo {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.isOpen:hover .chevron {
  opacity: 1;
  transition: opacity 0.3s ease;
}

/* Initially hide the chevron */
.chevron {
  opacity: 0;
}

/* Show logo by default */
.logo {
  opacity: 1;
}
</style>
