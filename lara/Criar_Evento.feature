Feature: Event page creation

    Scenario: Enter the website
        Given the user accesses the event creation page
        Then the user goes to the event creation page
        And clicks on create event

    Scenario: Start creating the event
        Given the user accesses the event creation page
        Then the user will be redirected to the page
        And the user starts filling in the spaces
        And enters the event title
        And enters the detailed description of the event
        And enters the start and end date and time
        And enters the location
        And enters the cover image, choosing a file from their own computer
        And enters the event type
        And enters the maximum capacity of participants
        Then after everything is filled in, the user can Save or Delete the event

    Scenario: If any field is not filled in
        Given the user accesses the event creation page
        When the user tries to save, an error will occur
        And the file will not be saved
        Then the execution will not be carried out

    Scenario: If everything is filled in correctly
        Given the user accesses the event creation page
        When the user finishes filling in all the fields
        And the event is saved
        Then the execution will be successful, a success mensage appears