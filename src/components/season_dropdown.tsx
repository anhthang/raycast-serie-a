import { Grid, List } from "@raycast/api";

export const seasons = {
  150052: "2022-23",
  30030: "2021-22",
  150051: "2020-21",
  120066: "2019-20",
  120056: "2018-19",
  120076: "2017-18",
  120167: "2016-17",
  120160: "2015-16",
  120077: "2014-15",
  120161: "2013-14",
  120123: "2012-13",
  120070: "2011-12",
  120093: "2010-11",
  120100: "2009-10",
  120139: "2008-09",
  120146: "2007-08",
  120092: "2006-07",
  120062: "2005-06",
  120116: "2004-05",
  120061: "2003-04",
  120127: "2002-03",
  120136: "2001-02",
  120057: "2000-01",
  120108: "1999-00",
  120098: "1998-99",
  120065: "1997-98",
  120114: "1996-97",
  120074: "1995-96",
  120072: "1994-95",
  120163: "1993-94",
  120091: "1992-93",
  120128: "1991-92",
  120122: "1990-91",
  120084: "1989-90",
  120117: "1988-89",
  120156: "1987-88",
  120089: "1986-87",
};

export default function SeasonDropdown(props: {
  type?: string;
  useTitle?: boolean;
  selected: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}) {
  const DropdownComponent =
    props.type === "grid" ? Grid.Dropdown : List.Dropdown;

  return (
    <DropdownComponent
      tooltip="Filter by Competition"
      value={props.selected}
      onChange={props.onSelect}
    >
      {Object.entries(seasons).map(([seasonId, title]) => {
        return (
          <DropdownComponent.Item
            key={seasonId}
            value={props.useTitle ? title : seasonId}
            title={title}
          />
        );
      })}
    </DropdownComponent>
  );
}
