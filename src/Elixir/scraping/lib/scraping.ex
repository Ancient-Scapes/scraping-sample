defmodule Scraping do
  def main do
    IO.inspect fetchNewsList
  end

  def fetchNewsList do
    HTTPoison.get!("https://gigazine.net/").body
    |> Floki.find("div.card > h2 > a")
    |> Enum.map(&(extractionNews(&1)))
  end

  # 必要な情報のみ抽出しMap化
  def extractionNews(n) do
    %{
      "title" => Floki.attribute(n, "title"),
      "link" => Floki.attribute(n, "href")
    }
  end

end
