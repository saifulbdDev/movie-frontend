import { useState, useMemo } from "react";
import { sortRows, filterRows, paginateRows } from "../../utils/helpers";


import './table.scss';
 const Table = ({
  columns,
  rows, 
  editHandle,
  deleteHandle,
}) => {
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ order: "asc", orderBy: "name" });
  const rowsPerPage = rows.length;

  const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])

  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)


  const handleSearch = (search,  value) => {
    setActivePage(1);

    if (search) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [value]: search,
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[value];

        return updatedFilters;
      });
    }
  };

  const handleSort = (value) => {
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === "asc" && prevSort.orderBy === value ? "desc" : "asc",
      orderBy: value,
    }));
  };

 
 
  const deleteRow = (value) => {
    deleteHandle(value);
  
  };

  return (
    <>
      <table className=" table table-striped">
        <thead>
          <tr>
            {columns.map(
              (column) => {
                const sortIcon = () => {
                  if (column.value === sort.orderBy) {
                    if (sort.order === "asc") {
                      return "⬆️";
                    }
                    return "⬇️";
                  } else {
                    return "️↕️";
                  }
                };
                return (
                  <th key={column.value}>
                  
                    {column.action === true ? (
                      ""
                    ) : (
                        <button onClick={() => handleSort(column.value)}>
                           <span>{column.name}</span>

                        {sortIcon()}
                      </button>
                      
                    )}
                  </th>
                );
              }
            )}
          </tr>
          <tr>
            {columns.map(
              (
                column,
                key
              ) => {
                return (
                  // value={filters[column.value]}

                  <th key={key}>
                    {column.action === true ? (
                      ""
                    ) : (
                      <input
                        key={`${column.value}-search`}
                        type="search"
                        className="form-control"
                        placeholder={`Search ${column.name}`}
                        onChange={(event) =>
                          handleSearch(event.target.value, column.value)
                        }
                      />
                    )}
                  </th>
                );
              }
            )}
          </tr>
        </thead>
        <tbody>
     {   calculatedRows.length > 0 ? (
         calculatedRows.map((row, key) => {
            return (
              <tr key={key + "_row"}>
                {columns.map((column, key) => {
                  if (column.format) {
                    return (
                      <td key={column.value}>
                        {column.format(row[column.value])}
                      </td>
                    );
                  } else if (column.action === true) {
                    return (
                      <td className="text-center" key={column.value}>
                      
                        <button
                          className="btn-danger"
                          onClick={() => deleteRow(row._id)}
                        >
                          Delete
                        </button>
                      </td>
                    );
                  }
                  return <td key={column.value}>{row[column.value]}</td>;
                })}
              </tr>
            );
          })) :   <tr><td colSpan="3" className="empty">Movie list empty</td></tr>  }
        </tbody>
      </table>

     
    </>
  );
};

export default Table;