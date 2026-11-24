import type { PriceGroup, PriceItem } from "../content";

export function PriceRow({ item }: { item: PriceItem }) {
  return (
    <li className="flex items-baseline gap-3 py-3">
      <span className="min-w-0">
        <span className="text-[1.15rem] leading-snug">{item.name}</span>
        {item.note && <span className="block text-sm text-rose-deep">{item.note}</span>}
      </span>
      <span className="leader" aria-hidden="true" />
      <span className="shrink-0 text-right tabular-nums">
        {item.from && <span className="mr-1.5 text-sm italic text-rose-deep">from</span>}
        <span className="text-[1.3rem] font-semibold">{item.price}</span>
      </span>
    </li>
  );
}

export function PriceList({ group, index = 0 }: { group: PriceGroup; index?: number }) {
  return (
    <div data-reveal style={{ "--d": `${index * 80}ms` } as React.CSSProperties}>
      <h3 className="text-[2rem] uppercase italic leading-none tracking-wide text-wine sm:text-[2.4rem]">
        {group.title}
      </h3>
      {group.intro && <p className="mt-2 text-rose-deep">{group.intro}</p>}
      <ul className="mt-4 divide-y divide-wine/10 border-t border-wine/15">
        {group.items.map((it) => (
          <PriceRow key={it.name} item={it} />
        ))}
      </ul>
    </div>
  );
}
