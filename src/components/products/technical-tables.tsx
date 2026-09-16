import tables from "@/data/legacy-tables.json";
type Key = keyof typeof tables;
export function TechnicalTables({ source }: { source: string }) {
  const data = tables[source as Key];
  if (!data) return null;
  return (
    <section className="technical-section" id="ordering-data">
      <h2>Published technical & ordering data</h2>
      <p className="data-note">
        The tables below reproduce the company’s published catalog. Confirm the
        kit code, dimensions and applicable test documentation with PM
        Industries before ordering. Inconsistent entries are retained as
        published, not corrected by assumption.
      </p>
      {data.map((t, i) => (
        <details className="data-accordion" key={i}>
          <summary>
            <span>
              {t.group &&
              !t.title.toLowerCase().includes("electrical") &&
              !t.title.toLowerCase().includes("insulator") ? (
                <small>{t.group}</small>
              ) : null}
              {t.title}
            </span>
            <span aria-hidden="true">+</span>
          </summary>
          <div
            className="table-scroll"
            role="region"
            aria-label={t.title}
            tabIndex={0}
          >
            <table>
              <caption>{t.title} — published reference</caption>
              <tbody>
                {t.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) =>
                      r === 0 ? (
                        <th
                          scope="col"
                          key={c}
                          colSpan={cell.colSpan}
                          rowSpan={cell.rowSpan}
                        >
                          {cell.text}
                        </th>
                      ) : (
                        <td
                          key={c}
                          colSpan={cell.colSpan}
                          rowSpan={cell.rowSpan}
                        >
                          {cell.text}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      ))}
    </section>
  );
}
