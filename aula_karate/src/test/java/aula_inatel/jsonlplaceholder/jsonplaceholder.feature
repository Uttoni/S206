@jsonplaceholder

Feature: Testar as operações presentes em JSONplaceholder

Background: Executa antes de cada teste.
    * def url_base = "https://jsonplaceholder.typicode.com"
    * def request_json = read('json_post.json')
    * def request_json2 = read('json_post2.json')

# $ é uma response (JSON)
# o # é o objeto ou expressão de resposta

Scenario: Testar a operação GET em /posts e verificar o retorno em formato array
    Given url url_base
    And path '/posts' 
    When method get
    Then status 200
    And match $ == '#[]'
    And match $ == '#[100]'
    And match each $ contains {title:'#string', id:'#number'}

Scenario: Testar a criação de recursos com o metodo POST na API /posts
    Given url url_base
    And path '/posts' 
    And request request_json
    When method post
    Then status 201
    And match $.id == 101
    And match $.body == "corpinho lindo"
    And match $.title == '#string'
    And print karate.sizeOf(response)
    And match karate.sizeOf(response) == 4


Scenario Outline: Testar a criação de recursos com o metodo POST na API /posts
    Given url url_base
    And path '/posts' 
    And request <request_json>
    When method post
    Then status 201
    And match $.id == 101
    And match $.body == '<texto_body>'
    And match $.title == '#string'
    And print karate.sizeOf(response)
    And match karate.sizeOf(response) == 4

    Examples:
    |request_json   |texto_body                     |
    |request_json   |corpinho lindo                 |
    |request_json2  |corpinho lindo dos outros      |