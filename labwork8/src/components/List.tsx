import { Fragment, type ReactNode } from "react";

type ListProps<T> = {
    items: T[];
    renderItem: (item: T) => ReactNode;
};

function List<T extends { id: number | string }>({ items, renderItem }: ListProps<T>) {
    return (<>
        {items.map((item) => (
            <Fragment key={item.id} >
                {renderItem(item)}
            </Fragment>
        ))}
    </>
    )
}

export default List;