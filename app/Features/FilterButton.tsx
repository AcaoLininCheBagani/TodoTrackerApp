import { Filter } from "../entities/todos"
import { Card, CardHeader, CardTitle, CardAction, CardDescription, CardContent } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
export default function FilterButton({ filter, setFilter }: Filter) {
  return (
    <CardHeader>
      <CardTitle>Todos</CardTitle>
      <CardDescription>
        <span className="hidden @[540px]/card:block">
          Total todos
        </span>
      </CardDescription>
      <CardAction>
        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(e) => {
            setFilter(e)
          }}
          variant="outline"
          className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
        >
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="active">Active</ToggleGroupItem>
          <ToggleGroupItem value="completed">Completed</ToggleGroupItem>
        </ToggleGroup>
      </CardAction>
    </CardHeader>
  )
}