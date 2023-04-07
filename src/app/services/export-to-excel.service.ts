import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as Excel from 'exceljs/dist/exceljs';

const EXCEL_TYPE =
  'application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExportToExcelService {
  constructor() {}

  exportAsExcelFile(data: any[], excelFileName: string) {
    const workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet(excelFileName, {
      views: [{ state: 'frozen', ySplit: 1 }],
    });
    worksheet = this.generateSheet(data, worksheet);
    this.saveExport(workbook, excelFileName);
  }

  generateSheet(data: any[], worksheet: any) {
    const arr = [];
    const keys = Object.keys(data[0]);
    data.map((res) => {
      const keyRow = [];
      keys.map((key) => {
        keyRow.push(res[key]);
      });
      if (keyRow.length === keys.length) {
        arr.push(keyRow);
      }
    });

    const header = Object.keys(data[0]);
    const headerRow = worksheet.addRow(header);

    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        bold: true,
        fgColor: { argb: 'c0d1dd' },
        bgColor: { argb: 'c0d1dd' },
      };

      cell.font = {
        name: 'Calibri',
        family: 4,
        size: 11,
        bold: true,
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.style = {
        verticalCentered: true,
        horizontalCentered: true,
      };
    });

    arr.forEach((element) => {
      const eachRow = [];
      Object.keys(data[0]).forEach((headers, i) => {
        worksheet.getColumn(i + 1).width = 20 + headers.length;
        eachRow.push(element[headers]);
      });
      let row = worksheet.addRow(element);
      return worksheet;
      // if (isColored) {
      //   // userID
      //   let ui = row.getCell(1);
      //   let uicolor = 'ffffff';
      //   if (ui >= 1 && ui <= 5) {
      //     uicolor = 'd4e3c1';
      //   } else if (ui >= 6 && ui <= 10) {
      //     uicolor = 'fee7ae';
      //   } else {
      //     uicolor = 'feb2ac';
      //   }
      //   ui.fill = {
      //     type: 'pattern',
      //     pattern: 'solid',
      //     fgColor: { argb: uicolor },
      //     bgColor: { argb: uicolor }
      //   };
      //   ui.border = {
      //     top: { style: 'thin' },
      //     left: { style: 'thin' },
      //     bottom: { style: 'thin' },
      //     right: { style: 'thin' }
      //   };

      //   // ID
      //   let id = row.getCell(2);
      //   let idcolor = 'ffffff';
      //   if (id >= 1 && id <= 100) {
      //     idcolor = 'd4e3c1';
      //   } else if (id >= 101 && id <= 150) {
      //     idcolor = 'fee7ae';
      //   } else {
      //     idcolor = 'feb2ac';
      //   }
      //   id.fill = {
      //     type: 'pattern',
      //     pattern: 'solid',
      //     fgColor: { argb: idcolor },
      //     bgColor: { argb: idcolor }
      //   };
      //   id.border = {
      //     top: { style: 'thin' },
      //     left: { style: 'thin' },
      //     bottom: { style: 'thin' },
      //     right: { style: 'thin' }
      //   };

      //   // completed
      //   let com = row.getCell(4);
      //   let comcolor = 'ffffff';
      //   if (com == 'false') {
      //     comcolor = 'd4e3c1';
      //   } else {
      //     comcolor = 'feb2ac';
      //   }
      //   com.fill = {
      //     type: 'pattern',
      //     pattern: 'solid',
      //     fgColor: { argb: comcolor },
      //     bgColor: { argb: comcolor }
      //   };
      //   com.border = {
      //     top: { style: 'thin' },
      //     left: { style: 'thin' },
      //     bottom: { style: 'thin' },
      //     right: { style: 'thin' }
      //   };
      // }
    });
  }
  saveExport(workbook, excelFileName) {
    workbook.xlsx.writeBuffer().then((value) => {
      const blob = new Blob([value], { type: EXCEL_TYPE });
      let fileName = '';
      const date = new Date().toLocaleDateString();
      fileName = excelFileName + EXCEL_EXTENSION;
      FileSaver.saveAs(blob, fileName);
    });
  }
}
