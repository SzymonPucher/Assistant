import { Component } from '@angular/core';
import { MenuIconButton } from 'src/app/models/menu-icon-button';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  buttons: MenuIconButton[];
  is_on: boolean;

  constructor() {
    this.is_on = false;
    this.resetButtons();
  }

  resetButtons() {
    this.buttons = [
      new MenuIconButton('Budget', 'budget'),
      new MenuIconButton('Budget - Expenses', 'budget/expenses'),
      new MenuIconButton('Budget - Expenses - Add', 'budget/expenses/add'),
      new MenuIconButton('Budget - Bills', 'budget/bills'),
      new MenuIconButton('Budget - Bills - Add', 'budget/bills/add'),
      new MenuIconButton('Budget - Bills - Add Bulk', 'budget/bills/add/bulk'),
      new MenuIconButton('Budget - Incomes', 'budget/incomes'),
      new MenuIconButton('Budget - Incomes - Add', 'budget/incomes/add'),
      new MenuIconButton('Budget - Inner Transfers', 'budget/innertransfers'),
      new MenuIconButton('Budget - Inner Transfers - Add', 'budget/innertransfers/add'),
      new MenuIconButton('Budget - Loans', 'budget/loans'),
      new MenuIconButton('Budget - Loans - Add', 'budget/loans/add'),
      new MenuIconButton('Journal - Event', 'journal/event'),
      new MenuIconButton('Journal - Pomodoro', 'journal/pomodoro')
    ];
  }

  changeMenu(itemName: string) {
    this.resetButtons();
    if (itemName == 'attach_money') {
      this.buttons.push(new MenuIconButton('trending_down'));
      this.buttons.push(new MenuIconButton('trending_up'));
      this.buttons.push(new MenuIconButton('import_export'));
      this.buttons.push(new MenuIconButton('supervisor_account'));
    } else if (itemName == 'notes') {
      this.buttons.push(
        new MenuIconButton('event_available', '/journal/event')
      );
      this.buttons.push(new MenuIconButton('av_timer', '/journal/pomodoro'));
    } else if (
      [
        'trending_down',
        'trending_up',
        'import_export',
        'supervisor_account',
      ].includes(itemName)
    ) {
      this.buttons.push(new MenuIconButton(itemName));

      let prefix = 'budget';
      if (itemName == 'trending_down') {
        prefix += '/expenses';
      } else if (itemName == 'trending_up') {
        prefix += '/incomes';
      } else if (itemName == 'import_export') {
        prefix += '/innertransfers';
      } else if (itemName == 'supervisor_account') {
        prefix += '/loans';
      }
      this.buttons.push(new MenuIconButton('add', prefix + '/add'));
      this.buttons.push(new MenuIconButton('ballot', prefix));
      this.buttons.push(new MenuIconButton('bar_chart', 'budget'));
      this.buttons.push(new MenuIconButton('grade', 'budget/bills'));
      this.buttons.push(new MenuIconButton('add_circle', 'budget/bills/add'));
    }
  }
}
