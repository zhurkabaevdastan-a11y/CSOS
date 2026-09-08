"""Import the identical candidate tables from the supplied RU/KK Word files.

Only the exact names, source numbers and selection outcomes are exported.
Public publication of the complete lists was confirmed by the user on 8 Sep 2026.
"""
import json
import sys
from collections import Counter
from pathlib import Path
from zipfile import ZipFile
from lxml import etree

NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
STATUSES = {"Допущен на 2 этап": "admitted", "Не прошел 1 этап": "not-selected"}

def read_rows(path):
    with ZipFile(path) as doc:
        root = etree.fromstring(doc.read("word/document.xml"))
    tables = root.xpath(".//w:body/w:tbl", namespaces=NS)
    if len(tables) != 1:
        raise ValueError("Expected one candidate table")
    rows = [["".join(cell.xpath(".//w:t/text()", namespaces=NS)).strip()
             for cell in row.xpath("./w:tc", namespaces=NS)]
            for row in tables[0].xpath("./w:tr", namespaces=NS)]
    if rows[0] != ["№", "Фамилия имя отчество", "Статус"]:
        raise ValueError("Unexpected source headers")
    return [{"number": int(row[0]), "name": row[1], "status": STATUSES[row[2]]}
            for row in rows[1:]]

ru, kk = map(read_rows, sys.argv[1:3])
assert ru == kk, "Russian and Kazakh lists differ"
assert [row["number"] for row in ru] == list(range(1, 1518))
assert all(row["name"] for row in ru)
assert Counter(row["status"] for row in ru) == {"admitted": 1427, "not-selected": 90}
target = Path(__file__).resolve().parents[1] / "app/young-faces-candidates.ts"
target.write_text(
    '// Generated from the identical RU/KK Word tables; keep names as supplied.\n'
    "type Candidate = { number: number; name: string; status: 'admitted' | 'not-selected' };\n"
    "const row = (number: number, name: string, status: Candidate['status']): Candidate => ({ number, name, status });\n"
    "export const youngFacesCandidates: Candidate[] = [\n"
    + "\n".join("  row(" + ", ".join(json.dumps(value, ensure_ascii=False) for value in (person["number"], person["name"], person["status"])) + ")," for person in ru)
    + "\n];\n", encoding="utf-8")
print(f"Validated {len(ru)} identical rows: 1427 admitted, 90 not selected; names unchanged")
