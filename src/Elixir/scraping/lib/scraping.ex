defmodule Scraping do
  def main do
    require Logger

    url = "https://gigazine.net/"
    response = HTTPoison.get!(url)
    Logger.info "レスポンス: #{inspect response}"
  end
end
