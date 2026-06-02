import { BadRequestException, Injectable } from "@nestjs/common";

export interface JournalLineInput {
  accountId: string;
  debit: number;
  credit: number;
}

@Injectable()
export class AccountingService {
  assertBalanced(lines: JournalLineInput[]): void {
    const debit = lines.reduce((sum, line) => sum + line.debit, 0);
    const credit = lines.reduce((sum, line) => sum + line.credit, 0);

    if (Math.abs(debit - credit) > 0.0001) {
      throw new BadRequestException("Journal entry must balance debits and credits.");
    }
  }
}

