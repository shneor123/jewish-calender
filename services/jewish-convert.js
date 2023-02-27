const Hebcal = require('hebcal')


class BotService {

    async convertToJewishDate(gregorianDate) {
        try {
            const regex = /^(\d{1,2})[-.,/]?(\d{1,2})[-.,/]?(\d{4})$/;
            const match = gregorianDate.match(regex);
            if (match) {
                const [, month, day, year] = match;
                const hebrewDate = new Hebcal.HDate(new Date(year, month - 1, day || 1));
                return hebrewDate.toString('h');
            } else {
                throw new Error('Invalid date format. Please enter a date in the format MM/DD/YYYY, MM-DD-YYYY, or MM.DD.YYYY.');
            }
        } catch (err) {
            throw new Error(`Failed to convert date: ${err.message}`);
        }
    }
}

const botService = new BotService()

module.exports = {
    botService
}
