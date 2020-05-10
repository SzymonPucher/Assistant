import Utils from '../shared/utils';

export class PomodoroEvent {
    
    catergory: string;
    name: string;
    start: string;
    duration: number;

    constructor (category: string, name: string, start: Date, duration: number){
        this.catergory = category;
        this.name = name;
        this.start = Utils.standard_formatted_date(start);
        this.duration = duration;
    }
}