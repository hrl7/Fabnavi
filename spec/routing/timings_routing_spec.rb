require "rails_helper"

RSpec.describe TimingsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/timings").to route_to("timings#index")
    end

    it "routes to #new" do
      expect(:get => "/timings/new").to route_to("timings#new")
    end

    it "routes to #show" do
      expect(:get => "/timings/1").to route_to("timings#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/timings/1/edit").to route_to("timings#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/timings").to route_to("timings#create")
    end

    it "routes to #update" do
      expect(:put => "/timings/1").to route_to("timings#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/timings/1").to route_to("timings#destroy", :id => "1")
    end

  end
end
