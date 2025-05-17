import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "./ui/button"

type Props = {
  title: string,
  url?: string,
  value?: string,
}

export function SiteHeader({ title, value, url }: Props) {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-between gap-1 px-3 lg:gap-2">
        <div className="flex items-center gap-1 px-3 lg:gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium">{title}</h1>
        </div>
        {
          url && title && (
            <Link href={url}>
              <Button size="sm" variant="default">{value}</Button>
            </Link>
          )
        }
      </div>
    </header>
  )
}
