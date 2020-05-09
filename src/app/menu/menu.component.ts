import { Component } from '@angular/core';
import { MenuIconButton } from '../models/menu-icon-button';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  buttons: MenuIconButton[];

  constructor() {
    this.resetButtons();
  }

  resetButtons() {
    this.buttons = [
      new MenuIconButton('attach_money', null, 'primary'),
      new MenuIconButton('notes', null, 'primary'),
    ];
  }

  changeMenu(iName: string) {
    this.resetButtons();
    if (iName == 'attach_money') {
      this.buttons.push(new MenuIconButton('trending_down'));
      this.buttons.push(new MenuIconButton('trending_up'));
      this.buttons.push(new MenuIconButton('import_export'));
      this.buttons.push(new MenuIconButton('supervisor_account'));
    } else if (iName == 'notes') {
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
      ].includes(iName)
    ) {
      this.buttons.push(new MenuIconButton(iName));

      let prefix = 'budget';
      if (iName == 'trending_down') {
        prefix += '/expenses';
      } else if (iName == 'trending_up') {
        prefix += '/incomes';
      } else if (iName == 'import_export') {
        prefix += '/innertransfers';
      } else if (iName == 'supervisor_account') {
        prefix += '/loans';
      }
      this.buttons.push(new MenuIconButton('add', prefix + '/add'));
      this.buttons.push(new MenuIconButton('ballot', prefix));
      this.buttons.push(new MenuIconButton('bar_chart', 'budget'));
    }
  }
}
