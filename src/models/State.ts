import Configuration from './Configuration';
import Option from './Option';
import ConfigurationOption from './ConfigurationOption';

export default class State {
    constructor () {
        this.options              = new Map();
        this.configurations       = new Map();
        this.configurationOptions = new Map();
        
        // -- Наполнение конфигуратора тестовыми данными
        [
            {id: '1', title: 'Sport'},
            {id: '2', title: 'Prestige'},
            {id: '3', title: 'Standart'},
            {id: '4', title: 'Comfort'},
        ].forEach((el) => {
            this.configurations.set(el.id, el);
        });

        [
            {   
                id      : 'color',
                title   : 'Цвет',
                variants: ['Белый', 'Синий', 'Красный'],
            },
            {
                id      : 'diameter',
                title   : 'Диаметр колёс',
                variants: ['14', '15', '16', '10'],
            },
            {
                id      : 'bonnet',
                title   : 'Надпись на капоте',
                variants: false,
            }
        ].forEach((el) => {
            this.options.set(el.id, el);
        });
        
        this.configurationOptions.set('1', [
            {
                id: 'bonnet',
                variant: true,
            },
            {
                id: 'color',
                variant: 'Белый',
            },    
        ]);
        // -- -- -- --
    }

    // Показыать ли форму редактирования
    isFormShow = false;

    configurations: Map<string, Configuration>;

    options: Map<string, Option>;

    selectedConfiguration: Configuration;
    selectedOptions?: ConfigurationOption[];

    configurationOptions: Map<string, ConfigurationOption[]>;

    formOptions: Map<string, ConfigurationOption> = new Map();
    formTitle = '';

    /**
     * Переключение видимости формы редактирования
     */
    public toggleForm(): void {
        this.isFormShow = !this.isFormShow;
    }

    /**
     * Генерация идентификатора
     * 
     * @returns {string}
     */
    private getId(): string {
        return Math.random().toString(16).slice(2);
    }

    /**
     * Редактирование конфигурации
     * 
     * @param {string | null} id Идентификатор конфигурации
     */
    public editConfiguration(id: string | null): void {
        this.isFormShow  = true;
        this.formOptions.clear;        

        if (null === id) {
            const configuration       = new Configuration();
                  configuration.id    = this.getId();
                  configuration.title = '';

            this.selectedConfiguration = configuration;      
        } else {
            this.selectedConfiguration = this.configurations.get(id)!;
        
            if (this.selectedConfiguration) {
                this.selectedOptions = this.configurationOptions.get(id);
            } 
        }

        this.formTitle = this.selectedConfiguration.title;
    }

    /**
     * Получение выбранных опций конфиругации
     * 
     * @param {string} id Идентификатор конфигурации
     * @returns {ConfigurationOption[]}
     */
    public getChosenOptions(id: string): ConfigurationOption[] {        
        if (this.configurationOptions.has(id)) {            
            return this.configurationOptions.get(id)!;
        }

        return [];
    }

    /**
     * Задать название конфигурации
     * 
     * @param {Event} event 
     */    
    public setConfigurationTitle(event: Event) {
        this.formTitle = (event.target as HTMLInputElement).value;
    }

    /**
     * Изменение опции концигурации
     * 
     * @param {ConfigurationOption} option изменённая опция
     */
    public changeConfigurationOption(option: ConfigurationOption) {
        this.formOptions.set(option.id, option);
    }

    /**
     * Добавление опции
     * 
     * @param {string} title 
     * @param {string} variants 
     */
    public addOption(title: string, variants: string) {
        
        const option: Option = {
            id: this.getId(),
            title: title,
            variants: variants ? variants.split(',') : false
        };

        this.options.set(option.id, option);
    }

    /**
     * Сохранение конфигурации
     */
    public saveConfiguration() {
        this.selectedConfiguration.title = this.formTitle;
        this.configurations.set(this.selectedConfiguration.id, this.selectedConfiguration);

        const confOptions = this.configurationOptions.get(this.selectedConfiguration.id);
        if (!confOptions) {
            this.configurationOptions.set(this.selectedConfiguration.id, Array.from(this.formOptions.values()));
        }
        else {
            const result: ConfigurationOption[] = [];
            confOptions.forEach((option) => {
                if (this.formOptions.has(option.id)) {
                    result.push(this.formOptions.get(option.id) as ConfigurationOption);
                    this.formOptions.delete(option.id);
                }
                else {
                    result.push(option);
                }
            });

            if (this.formOptions.size > 0) {
                for (const option of this.formOptions.values()) {
                    result.push(option);
                }
            }

            this.configurationOptions.set(this.selectedConfiguration.id, result);
        }

        this.formOptions.clear;
    }
}