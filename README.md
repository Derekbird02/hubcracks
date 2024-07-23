const emptyRowCount = entriesPerPage - currentEntries.length;
    const emptyRows = Array.from({ length: emptyRowCount }, (_, index) => (
        <tr key={`empty-${index}`} className="h-14">
            <td className="px-6 py-4">&nbsp;</td>
            <td className="px-6 py-4">&nbsp;</td>
            <td className="px-6 py-4">&nbsp;</td>
        </tr>
    ));
