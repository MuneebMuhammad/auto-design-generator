
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt
from wordcloud import WordCloud
from collections import Counter
import pandas as pd

import warnings

with warnings.catch_warnings():
    warnings.simplefilter("ignore", category=FutureWarning)
    import seaborn as sns
import streamlit as st
import networkx as nx
import sys
import os


# Function to parse HTML and extract data
def parse_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    soup = BeautifulSoup(content, 'lxml')
    text = soup.get_text()

    tags = [tag.name for tag in soup.find_all()]
    attributes = [attr for tag in soup.find_all() for attr in tag.attrs]
    classes_and_ids = [value for tag in soup.find_all() for key, value in tag.attrs.items() if key in ["class", "id"]]
    flattened_classes_and_ids = [item for sublist in classes_and_ids for item in sublist if isinstance(sublist, list)]
    script_types = [tag.get('type', 'No type attribute') for tag in soup.find_all('script')]

    return tags, attributes, text, flattened_classes_and_ids, script_types


def create_histogram(data, title, xlabel):
    counter = Counter(data)
    
    # Check if the dataset is empty
    if not counter:
        st.warning(f"No data available for {title}.")
        return

    plt.figure(figsize=(10, 6))
    sns.barplot(x=list(counter.keys()), y=list(counter.values()), palette='viridis')
    plt.title(title)
    plt.xlabel(xlabel)
    plt.ylabel('Frequency')
    plt.xticks(rotation=45)
    st.pyplot(plt)
    


def create_histogram(data, title, xlabel):
    counter = Counter(data)
    
    # Check if the dataset is empty
    if not counter:
        st.warning(f"No data available for {title}.")
        return

    # Get the top 10 most common items
    most_common = counter.most_common(20)

    # Separating keys and values for plotting
    keys, values = zip(*most_common)

    plt.figure(figsize=(10, 6))
    sns.barplot(x=list(keys), y=list(values), palette='viridis')
    plt.title(title)
    plt.xlabel(xlabel)
    plt.ylabel('Frequency')
    plt.xticks(rotation=45)
    st.pyplot(plt)



def create_wordcloud(text):
    wordcloud = WordCloud(width = 800, height = 800, background_color ='white', min_font_size = 10).generate(text)
    plt.figure(figsize = (8, 8), facecolor = None)
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.tight_layout(pad = 0)
    st.pyplot(plt)
    
# Function to parse HTML and extract data for heatmap
def parse_html_for_heatmap(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    soup = BeautifulSoup(content, 'lxml')
    data = []

    for tag in soup.find_all(True):
        for attr in tag.attrs:
            data.append((tag.name, attr))

    df = pd.DataFrame(data, columns=['Tag', 'Attribute'])
    heatmap_data = df.groupby(['Tag', 'Attribute']).size().unstack(fill_value=0)
    return heatmap_data

# Function to create a heatmap
def create_heatmap(data):
    plt.figure(figsize=(12, 8))
    sns.heatmap(data, annot=True, cmap="viridis")
    plt.title("Heatmap of Tag and Attribute Frequencies")
    st.pyplot(plt)


def create_attribute_cooccurrence_matrix(soup):
    attributes_data = []

    for tag in soup.find_all(True):
        if tag.attrs:
            attributes_data.append(list(tag.attrs.keys()))

    # Create a DataFrame where each row represents a tag, and columns are attributes, filled with 1s and 0s
    df = pd.DataFrame(attributes_data).applymap(lambda x: 1 if x else 0)
    cooccurrence_matrix = df.T.dot(df)  # Calculate the co-occurrence matrix

    plt.figure(figsize=(12, 8))
    sns.heatmap(cooccurrence_matrix, cmap="viridis", annot=True)
    plt.title("Attribute Co-occurrence Matrix")
    st.pyplot(plt)
    
    

def create_link_analysis(soup):
    G = nx.Graph()

    for link in soup.find_all('a', href=True):
        href = link['href']
        text = link.get_text(strip=True)
        G.add_node(text)
        G.add_edge(soup.title.string, text, href=href)

    plt.figure(figsize=(12, 8))
    pos = nx.spring_layout(G)
    nx.draw(G, pos, with_labels=True, font_weight='bold')
    plt.title("Network of Internal and External Links")
    st.pyplot(plt)
    
# def create_dom_tree(html_content):
#     # This is a placeholder for DOM tree visualization
#     # DOM tree visualization is quite complex and would require a significant custom implementation
#     st.text("DOM Tree Visualization (To be implemented)")

# Streamlit UI

def main():
    # Check if a file path is provided as an argument
    if len(sys.argv) > 1:
        file_path = sys.argv[1]

        # Optional: Check if the file exists
        if not os.path.isfile(file_path):
            st.error("File does not exist: " + file_path)
            return

        st.title("HTML File Analysis Dashboard")

        #file_path = st.text_input("Enter the path of your HTML file:")

        if file_path:
            tags, attributes, text, classes_and_ids, script_types = parse_html(file_path)

            st.header("HTML Tag Frequency")
            create_histogram(tags, "Frequency of HTML Tags", "Tags")

            st.header("HTML Attribute Frequency")
            create_histogram(attributes, "Frequency of HTML Attributes", "Attributes")
            
            # st.header("Heatmap of Tag and Attribute Frequencies")
            # heatmap_data = parse_html_for_heatmap(file_path)
            # create_heatmap(heatmap_data)

            st.header("Most Used Classes and IDs")
            create_histogram(classes_and_ids, "Frequency of Classes and IDs", "Classes/IDs")
            
            st.header("Link Analysis")
            create_link_analysis(BeautifulSoup(open(file_path, 'r', encoding='utf-8').read(), 'lxml'))
            
            st.header("Word Cloud of HTML Content")
            create_wordcloud(text)

            # st.header("Script Types in HTML")
            # create_histogram(script_types, "Frequency of Script Types", "Script Types")    
            
            # Link Analysis
            #st.header("Cooccurence Matrix")
            #create_attribute_cooccurrence_matrix(BeautifulSoup(open(file_path, 'r', encoding='utf-8').read(), 'lxml'))


    else:
        st.error("No file path provided. Please run the script with a file path.")

if __name__ == "__main__":
    main()