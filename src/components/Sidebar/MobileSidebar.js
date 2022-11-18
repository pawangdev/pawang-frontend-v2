import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeSidebar } from '../../features/sidebarSlice'

import { Backdrop, Transition } from '@windmill/react-ui'
import SidebarContent from './SidebarContent'


function MobileSidebar() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.value);

  return (
    <Transition show={isSidebarOpen}>
      <>
        <Transition
          enter="transition ease-in-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Backdrop onClick={() => dispatch(closeSidebar())} />
        </Transition>

        <Transition
          enter="transition ease-in-out duration-150"
          enterFrom="opacity-0 transform -translate-x-20"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 transform -translate-x-20"
        >
          <aside className="fixed inset-y-0 z-50 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 lg:hidden">
            <SidebarContent />
          </aside>
        </Transition>
      </>
    </Transition>
  )
}

export default MobileSidebar
