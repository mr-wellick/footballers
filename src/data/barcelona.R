library("rvest")
library("dplyr")
library("stringr")

# mention <- "gets" operator
extract_season_data = function(url) {
  season_table = read_html(url)
  
  col_names = season_table %>% html_nodes(".players .dib") %>% html_text()
  season_data = season_table %>% html_nodes(".players .Table__TD") %>% html_text()
  
  # mention tibbles (the modern data frame) and tibble package
  season_df = matrix(season_data, ncol = 16, byrow = TRUE) %>% as.data.frame()
  
  colnames(season_df) = tolower(col_names)
  season_df['num'] = season_df$name %>% str_match('\\d+')
  season_df$name = season_df$name %>% str_match('\\D+') %>% str_replace_all("[[:punct:]]", "")
  
  return(season_df %>% select(name:age, nat:num) %>% mutate_all(na_if, "--"))
}

base_url = 'https://www.espn.com/soccer/team/squad/_/id/83/league/ESP.1/season/'
season_years = (2004:2020) %>% as.character()
season_urls = paste(base_url, sep = "", season_years)

# lapply to iterate season_urls and create a list of data frames
season_list = lapply(season_urls, extract_season_data)
View(season_list[[1]])


for (index in 1:length(season_years)) {
  write.csv(
    season_list[[index]], 
    file = paste(season_years[index], sep = '', '.csv'), 
    row.names = F
  )
}


