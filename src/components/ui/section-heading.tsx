import {Component} from "solid-js";

const SectionHeading: Component<{
    title: string
    subTitle: string
    status: string
}> = (props) => {
    const title = () => props.title;
    const subTitle = () => props.subTitle;
    const status = () => props.status;
    return (
        <div class="relative w-full border-b border-gray-200 p-2 dark:border-white/10">
            <div class="sm:flex sm:items-baseline sm:justify-between">
                <div class="sm:w-0 sm:flex-1">
                    <h1 id="message-heading" class="text-base font-semibold text-gray-900 dark:text-white">
                        {title()}
                    </h1>
                    <p class="mt-1 truncate text-sm text-gray-500 dark:text-gray-400">
                        {subTitle()}
                    </p>
                </div>

                <div class="flex items-center justify-between sm:mt-0 sm:ml-6 sm:shrink-0 sm:justify-start">
          <span
              class="absolute top-2 right-2">
              <span
                  class={" inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:inset-ring-green-500/10"}>
            {status()}
                  </span>
          </span>
                    <div class="-my-2 ml-3 inline-block text-left">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionHeading;