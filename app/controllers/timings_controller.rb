class TimingsController < ApplicationController
  before_action :set_timing, only: [:show, :edit, :update, :destroy]

  # GET /timings
  # GET /timings.json
  def index
    @timings = Timing.all
  end

  # GET /timings/1
  # GET /timings/1.json
  def show
  end

  # GET /timings/new
  def new
    @timing = Timing.new
  end

  # GET /timings/1/edit
  def edit
  end

  # POST /timings
  # POST /timings.json
  def create
    @timing = Timing.new(timing_params)

    respond_to do |format|
      if @timing.save
        format.html { redirect_to @timing, notice: 'Timing was successfully created.' }
        format.json { render :show, status: :created, location: @timing }
      else
        format.html { render :new }
        format.json { render json: @timing.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /timings/1
  # PATCH/PUT /timings/1.json
  def update
    respond_to do |format|
      if @timing.update(timing_params)
        format.html { redirect_to @timing, notice: 'Timing was successfully updated.' }
        format.json { render :show, status: :ok, location: @timing }
      else
        format.html { render :edit }
        format.json { render json: @timing.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /timings/1
  # DELETE /timings/1.json
  def destroy
    @timing.destroy
    respond_to do |format|
      format.html { redirect_to timings_url, notice: 'Timing was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_timing
      @timing = Timing.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def timing_params
      params.require(:timing).permit(:time, :movie)
    end
end
