import { Filter } from "../entities/todos"
import { Card, CardHeader, CardTitle, CardAction, CardDescription, CardContent } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useTodoStore } from "../providers/todo-store-provider"
export default function FilterButton() {
  const { filter, setFilter } = useTodoStore(state => state)
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