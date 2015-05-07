require 'rails_helper'

RSpec.describe "timings/index", type: :view do
  before(:each) do
    assign(:timings, [
      Timing.create!(
        :time => "Time",
        :movie => ""
      ),
      Timing.create!(
        :time => "Time",
        :movie => ""
      )
    ])
  end

  it "renders a list of timings" do
    render
    assert_select "tr>td", :text => "Time".to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
  end
end
