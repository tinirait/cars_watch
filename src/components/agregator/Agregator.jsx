import { useState } from "react";
import styles from './Agregator.module.css';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';






function Agregator() {

// Генерация списка годов
    const years = [];
    for (let i = new Date().getFullYear(); i >= 1900; i--) {
        years.push({ value: String(i), label: String(i) });
    }

    // Состояние формы
    const [formData, setFormData] = useState({
        carYear: null,
        carMake: null,
        carModel: null,
        departure: null,
        destination: null
    });



    const [filteredMakes, setFilteredMakes] = useState([]);
    const [filteredModels, setFilteredModels] = useState([]);

    // Функция для загрузки вариантов Departure и Destination
    const loadDepartureAndDestinationOptions = async (inputValue) => {
        if (!inputValue) {
            return [];
        }

        const shardType = consistsOfLettersCityOrZip(inputValue) ? 'city' : 'zip';
        try {
            const results = await getCity(inputValue, shardType);
            return results.map(result => ({
                value: result.fullName,
                label: result.fullName,
            }));
        } catch (error) {
            console.error('Ошибка при загрузке городов:', error);
            return [];
        }
    };


    // Обработчик изменения Departure
    const handleDepartureChange = (selectedOption) => {
        setFormData({
            ...formData,
            departure: selectedOption
        });
    };

    // Обработчик изменения Destination
    const handleDestinationChange = (selectedOption) => {
        setFormData({
            ...formData,
            destination: selectedOption
        });
    };
    // Обработчик изменения Car Year
    const handleYearChange = (selectedOption) => {
        setFormData({
            ...formData,
            carYear: selectedOption,
            carMake: null,
            carModel: null,
        });

        if (selectedOption) {
            getAutoMarksOnYaear(selectedOption.value);
        } else {
            setFilteredMakes([]);
            setFilteredModels([]);
        }
    };

    // Обработчик изменения Car Make
    const handleMakeChange = (selectedOption) => {
        setFormData({
            ...formData,
            carMake: selectedOption,
            carModel: null,
        });

        if (selectedOption) {
            getAutoModelOnMarks(selectedOption.value);
        } else {
            setFilteredModels([]);
        }
    };

    // Обработчик изменения Car Model
    const handleModelChange = (selectedOption) => {
        setFormData({
            ...formData,
            carModel: selectedOption,
        });
    };


    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Submitted:", {
            ...formData,
            carYear: formData.carYear ? formData.carYear.value : "",
            carMake: formData.carMake ? formData.carMake.value : "",
            carModel: formData.carModel ? formData.carModel.value : "",
            departure: formData.departure ? formData.departure.value : "",
            destination: formData.destination ? formData.destination.value : "",
        });

        try {
            // Получаем nonce
            // const nonce = await getNonce();
            // const dateUpdateShipping =  await outDate(formData.shippingDate, formData.shippingDate === 'other' ? formData.customDate : null)
            // console.log(dateUpdateShipping)
             //тут нужно сделать проверку на null, если 1 поле null форма не отправляется(кнопка отправки не активна)
            // await postOrder(nonce, formData.carYear.value, formData.carMake.value, formData.carModel.value, formData.departure.value, formData.destination.value, dateUpdateShipping)



        } catch (error) {
            console.error("Error during form submission:", error);
        }


    };

    // Функция для получения марок автомобилей по году
    const getAutoMarksOnYaear = async (year) => {
        try {
            const response = await fetch('https://done.ship.cars/makes/?year=' + year);
            const data = await response.json();
            const makes = data.map(item => ({ value: item.make, label: item.make }));
            setFilteredMakes(makes);
        } catch (err) {
            console.log(err);
        }
    };

    // Функция для получения моделей автомобилей по марке
    const getAutoModelOnMarks = async (marks) => {
        try {
            const response = await fetch('https://done.ship.cars/models/?year=2023&make=' + marks);
            const data = await response.json();
            const models = data.map(item => ({ value: item.model, label: item.model }));
            setFilteredModels(models);
        } catch (err) {
            console.log(err);
        }
    };

    // Функция для получения городов или почтовых индексов
    const getCity = async (shard, shardType) => {
        let shardTypeField;
        switch (shardType) {
            case 'city':
                shardTypeField = 'citystate_suggest';
                break;
            case 'zip':
                shardTypeField = 'name_suggest';
                break;
            default:
                console.log('Invalid shard type in getCities() function!');
                return [];
        }

        try {
            const response = await fetch('https://www.montway.com/es/gis/_suggest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    city_state: {
                        text: shard,
                        completion: {
                            field: shardTypeField,
                            fuzzy: { fuzziness: 0 },
                            size: 8
                        }
                    }
                })
            });
            const data = await response.json();
            return data.city_state[0].options.map(option => ({
                fullName: option._source.text,
                city: option._source.payload.city,
                state: option._source.payload.state
            }));
        } catch (error) {
            console.error('Ошибка при получении городов:', error);
            return [];
        }
    };

    //Проверка формы на заполнение всех полей

    const isFormValid = () => {
        return (
            formData.carYear &&
            formData.carMake &&
            formData.carModel &&
            formData.departure &&
            formData.destination
        );
    };


    // Функция для проверки, состоит ли строка из букв (для определения типа ввода: город или индекс)
    const consistsOfLettersCityOrZip = (str) => str.split('').every(symbol => 'abcdefghijklmnopqrstuvwxyz '.includes(symbol.toLowerCase()));

    return (
        <form className={styles.quoteForm} onSubmit={handleSubmit}>
            <h2>GET INSTANT QUOTE</h2>

            {/* Первая строка — город отправления и назначения */}
            <div className={styles.inlineGroup}>
                <div className={styles.selectWrapper}>
                    <AsyncSelect
                        name="departure"
                        placeholder="Departure city or zip"
                        value={formData.departure}
                        loadOptions={loadDepartureAndDestinationOptions}
                        onChange={handleDepartureChange}
                        cacheOptions
                        defaultOptions
                    />
                </div>

                <div className={styles.selectWrapper}>
                    <AsyncSelect
                        name="destination"
                        placeholder="Destination city or zip"
                        value={formData.destination}
                        loadOptions={loadDepartureAndDestinationOptions}
                        onChange={handleDestinationChange}
                        cacheOptions
                        defaultOptions
                    />
                </div>
            </div>

            {/* Вторая строка — год, марка, модель */}
            <div className={styles.inputGroup}>
                <div className={styles.selectWrapper}>
                    <Select
                        name="carYear"
                        placeholder="Car year"
                        value={formData.carYear}
                        options={years}
                        onChange={handleYearChange}
                    />
                </div>

                <div className={styles.selectWrapper}>
                    <Select
                        name="carMake"
                        placeholder="Car make"
                        value={formData.carMake}
                        options={filteredMakes}
                        onChange={handleMakeChange}
                    />
                </div>

                <div className={styles.selectWrapper}>
                    <Select
                        name="carModel"
                        placeholder="Car model"
                        value={formData.carModel}
                        options={filteredModels}
                        onChange={handleModelChange}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={!isFormValid()}
                className={!isFormValid() ? styles.disabledButton : ''}
            >
                SEARCH
            </button>
        </form>

    );
}

export default Agregator;