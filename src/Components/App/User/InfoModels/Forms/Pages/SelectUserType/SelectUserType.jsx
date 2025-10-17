import React, { useState, useEffect } from "react";
import UserTypeRadioGroup from "./UserTypeRadioGroup";

const SelectUserType = ({ onUserTypeChange, currentSelection }) => {
  const [selectedUserType, setSelectedUserType] = useState("self");
  const [selectedSubUserType, setSelectedSubUserType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("name");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isSearching, setIsSearching] = useState(true);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Initialize with current selection if provided
    if (currentSelection) {
      setSelectedUserType(currentSelection.type);
      setSelectedPerson(currentSelection.selectedPerson);
    }
  }, [currentSelection]);

  //this func is responsible for handling when a user selects a different radio button
  const handleUserTypeChange = (type) => {
    setSelectedUserType(type);
    setSelectedPerson(null);
    setSearchQuery("");
    setShowResults(false);

    // Notify parent component
    onUserTypeChange({
      type: type,
      selectedPerson: null,
    });
  };

  //this func is responsible for input changes in the search box
  const handleSearchChange = (query) => {
    setSearchQuery(query);

    if (query.length >= 2) {
      // Trigger search after user stops typing (implement debouncing)
      performSearch(query);
    } else {
      setShowResults(false);
      setSearchResults([]);
    }
  };

  // Handle person selection from search results
  const handlePersonSelect = (person) => {
    // Set selected person
    setSelectedPerson(person);
    // Hide search results after selection

    setShowResults(false);

    // Notify parent component
    onUserTypeChange({
      type: "select-who",
      selectedPerson: person,
    });
  };

  // Handle clear selection
  const handleClearSelection = (subType) => {
    setSelectedSubUserType(subType);

    // Notify parent component
    onUserTypeChange({
      type: "select-who",
      subType: subType,
      selectedPerson: null,
    });
  };

  // Handle sub user type selection from dropdown
  const handleUserTypeSelection = (subType) => {
    setSelectedSubUserType(subType);

    // Notify parent with both main type and sub type
    onUserTypeChange({
      type: "select-who",
      subType: subType,
      selectedPerson: null,
    });
  };

  const performSearch = async (query) => {
    try {
      // TODO: Replace with actual API call
      // const results = await searchPersonsAPI(query, searchFilter);
      // setSearchResults(results);

      // For now, mock data:
      setTimeout(() => {
        setSearchResults([
          {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            phone: "9876543210",
            userId: "USR001",
            photo: null,
          },
        ]);
        setShowResults(true);
        setIsSearching(false);
      }, 1000);
    } catch (error) {
      console.error("Search error:", error);
      setIsSearching(false);
    }
  };

  return (
    <>
      <UserTypeRadioGroup
        selectedUserType={selectedUserType}
        searchFilter={searchFilter}
        searchQuery={searchQuery}
        searchResults={searchResults}
        selectedPerson={selectedPerson}
        isSearching={isSearching}
        showResults={showResults}
        handleUserTypeChange={handleUserTypeChange}
        setSearchFilter={setSearchFilter}
        handleSearchChange={handleSearchChange}
        handlePersonSelect={handlePersonSelect}
        handleClearSelection={handleClearSelection}
        selectedSubUserType={selectedSubUserType}
        handleUserTypeSelection={handleUserTypeSelection}
      />
    </>
  );
};

export default SelectUserType;
