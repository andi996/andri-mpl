import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
// import { teams } from "./data";

const TableStandings = ({ teams, isMobile }) => {
  function matchFormatter(column, colIndex, { sortElement, filterElement }) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {column.text}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>W</div>
          <div>L</div>
        </div>
      </div>
    );
  }

  function percentageFormatter(column) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {column.text} %{/* <div>PERCENTAGE</div> */}
      </div>
    );
  }

  const columns = [
    {
      dataField: "",
      text: "RANK",
      headerStyle: {
        width: "5%",
      },
      headerClasses: "header-container",
      classes: "header-container",
      formatter: (cell, row, index) => {
        // return <div className="header-container">{index + 1}</div>;
        return index + 1;
      },
    },
    {
      dataField: "name",
      text: "TEAM",
      headerAlign: "left",
      headerClasses: "header-container",
      classes: "header-container",
      formatter: (cell, row, index) => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <img src={`./${row.image}.png`} alt="" width={22} height={22} />
            <div>{row.name}</div>
          </div>
        );
      },
    },

    {
      dataField: "match",
      text: "MATCH",
      headerAlign: "center",
      headerFormatter: matchFormatter,
      headerStyle: {
        width: "5%",
      },
      headerClasses: "header-container",
      classes: "header-container",
      formatter: (cell, row, index) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>{row.match_win}</div>
            <span>-</span>
            <div>{row.match_lose}</div>
          </div>
        );
      },
    },
    {
      dataField: "match_wr",
      text: "MATCH",
      headerAlign: "center",
      headerFormatter: percentageFormatter,
      headerClasses: "header-container",
      classes: "header-container",
      formatter: (cell, row, index) => {
        return (
          <div>
            {((row.match_win / (row.match_win + row.match_lose)) * 100).toFixed(
              0
            )}
            %
          </div>
        );
      },
    },
    {
      dataField: "game",
      text: "GAME",
      headerAlign: "center",
      headerFormatter: matchFormatter,
      headerStyle: {
        width: "5%",
        letterSpacing: "3px",
      },
      headerClasses: "header-container",
      classes: "header-container",
      formatter: (cell, row, index) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>{row.game_win}</div>
            <span>-</span>
            <div>{row.game_lose}</div>
          </div>
        );
      },
    },
    {
      dataField: "game_wr",
      text: "GAME",
      headerAlign: "center",
      headerFormatter: percentageFormatter,
      headerClasses: "header-container",
      classes: "header-container",
      formatter: (cell, row, index) => {
        return (
          <div>
            {((row.game_win / (row.game_win + row.game_lose)) * 100).toFixed(0)}
            %
          </div>
        );
      },
    },
  ];

 

  const rowStyle = (row, rowIndex) => {
    const style = {};
    if (rowIndex <= 1) {
      style.backgroundColor = "rgba(0,128,0,0.3)";
    }

    if (rowIndex >= 6) {
      style.backgroundColor = "rgba(254,0,0,0.2)";
    }

    style.fontWeight = "bold";

    return style;
  };

  return (
    <BootstrapTable
      keyField="id"
      data={teams ?? []}
      columns={columns}
      rowStyle={rowStyle}
      headerClasses="header-class"
      noDataIndication="Tidak ada Data"
    />
  );
};

export default TableStandings;
