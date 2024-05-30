import Events from './model.js'

export const create = async (req, res) => {
	try {
		const { name, dateTime, location, description, organizer, theme, status } = req.body

        const newEvent = new Events({
            name,
            dateTime,
            location,
            theme,
            description,
            organizer,
            status
        });
        
        await newEvent.save();
        
        res.status(200).send({ message: 'Event created successfully', event: newEvent });

	} catch (error) {
        res.status(500).send({ status: false, message: 'Error creating event', error: error.message })
	}

}

export const fetchAll = async (req, res) => {
	try {
		const events = await Events.find()
        res.status(200).send(events);
	} catch (error) {
        res.status(500).send({ status: false, message: 'Error fetching events', error: error.message })
	}
}

export const fetchById = async (req, res) => {
	try {
		const { id } = req.params
		const events = await Events.findById(id)
        res.status(200).send(events);
	} catch (error) {
        res.status(500).send({ status: false, message: 'Event not found', error: error.message })
	}
}

export const editById = async (req, res) => {
	try {
		const { id } = req.params
        const {  name, dateTime, location, description, organizer, theme, status } = req.body
		const updatedEvent = await Events.findByIdAndUpdate(id, {
            name,
            dateTime,
            location,
            description,
            organizer,
            theme,
            status
        },
        { new: true })

		if (!updatedEvent) {
			return res.status(404).send({ status: false, message: 'Event not found' })
		}
        
        res.status(200).send({ status: true, message: 'Event updated successfully', event: updatedEvent });
	} catch (error) {
        res.status(500).send({ status: false, message: 'An error occurred while updating event', error: error.message })
	}
}

export const deleteById = async (req, res) => {
	try {
		const { id } = req.params
		const deletedEvent = await Events.findByIdAndDelete(id)

		if (!deletedEvent) {
			return res.status(404).send({ status: false, message: 'Event not found' })
		}

		res.status(200).send({ status: true, message: 'Event deleted successfully', event: deletedEvent })
	} catch (error) {
		res.status(500).send({ status: false, message: 'An error occurred while deleting the event', error: error.message })
	}
}

export const fetchFiltered = async (req, res) => {
	try {
		const { status } = req.query
		const events = await Events.find({ status: { $regex: new RegExp(status, 'i') } })
        res.status(200).send(events);
	} catch (error) {
        res.status(500).send({ status: false, message: 'Event not found', error: error.message })
	}
}