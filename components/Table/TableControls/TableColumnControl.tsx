import { DropdownMenu } from 'radix-ui';

type TableHeaderProps = {
  columns: {
    [key:string]: boolean
  },
  onChange: (name:string)=> void
}

function TableColumnControl({
  columns,
  onChange
}: TableHeaderProps){
  const colNames = Object.keys(columns);
  const shownHeaderCount = colNames.filter(h => columns[h]).length;

  return <DropdownMenu.Root>
    <DropdownMenu.Trigger className="cursor-pointer">Shown columns: {shownHeaderCount}</DropdownMenu.Trigger>

    <DropdownMenu.Portal>
      <DropdownMenu.Content>
        <form className="max-h-100 overflow-y-scroll bg-white shadow-md p-4" >{
          colNames.map(name => (
            <DropdownMenu.Item key={name} className="cursor-pointer flex">
              <input id={name} name={name} type="checkbox" checked={columns[name]} onChange={()=>onChange(name)} className="cursor-pointer"/>
              <label htmlFor={name} className="cursor-pointer grow-2" onClick={()=>onChange(name)}>{name}</label>
            </DropdownMenu.Item>))
        }</form>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>;
}

export default TableColumnControl;