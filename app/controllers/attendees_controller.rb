class AttendeesController < ApplicationController
  def create
    itinerary = Itinerary.find(params[:itinerary_id])
    attendee = itinerary.attendees.build(user: current_user)
    if attendee.save
      avail_seats = itinerary.available_seat - 1
      itinerary.update(available_seat: avail_seats)
    end
    redirect_to itinerary_path(itinerary)
  end
end
