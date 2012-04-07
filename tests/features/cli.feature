Feature:Developer uses the cli tool
  In order for the easily develop using nerve
  A Developer 
  Should have a simple interface to nerve

  Scenario: Developer generate the default nerve directory structure
    When I generate the application
    Then I should see the appropirate files
    And I the generated application should boot


