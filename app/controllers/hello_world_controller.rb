# frozen_string_literal: true

class HelloWorldController < PublicController

  def index
    @hello_world_props = { name: "Stranger" }
  end
end
