// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "./Candidate.sol";
// import "./Voter.sol";
import "./AAiTVoteToken.sol";

// import "./AAiTStudent.sol";
// import "./AAiTElectionHandler.sol";

library AAiTElectionLibrary {
    function contains(address[] memory array, address value)
        internal
        pure
        returns (bool)
    {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return true;
            }
        }
        return false;
    }

    function indexOf(address[] memory array, address value)
        internal
        pure
        returns (uint256)
    {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return i;
            }
        }
        return array.length;
    }

    function findLargest(uint256[] memory array)
        internal
        pure
        returns (uint256)
    {
        uint256 largest = 0;
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] > largest) {
                largest = array[i];
            }
        }
        return largest;
    }

    // function bytes32ToString(bytes32 _bytes32)
    //     internal
    //     pure
    //     returns (string memory)
    // {
    //     uint8 i = 0;
    //     while (i < 32 && _bytes32[i] != 0) {
    //         i++;
    //     }
    //     bytes memory bytesArray = new bytes(i);
    //     for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
    //         bytesArray[i] = _bytes32[i];
    //     }
    //     return string(bytesArray);
    // }
}

contract AAiTElection {
    enum DEPTARTMENT_TYPE {
        BIOMED,
        CHEMICAL,
        CIVIL,
        ELEC,
        MECHANICAL,
        SITE
    }
    enum ELECTION_STATUS {
        PENDING,
        ONGOING,
        COMPLETED
    }
    enum PHASE_NAME {
        REGISTRATION,
        REGISTRATION_BREAK,
        SECTION_ELECTION,
        SECTION_ELECTION_BREAK,
        BATCH_ELECTION,
        BATCH_ELECTION_BREAK,
        DEPARTMENT_ELECTION,
        COMPLETED
    }
    string[] private deptTypes = [
        "Biomedical Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Software Engineering"
    ];

    struct ElectionStruct {
        uint256 index;
        string name;
        ELECTION_STATUS status;
        uint256 startDate;
        uint256 endDate;
        address[] candidates;
        address[] winners;
        uint256 year;
        uint256 section;
        DEPTARTMENT_TYPE department;
    }
    struct ElectionPhase {
        PHASE_NAME phaseName;
        uint256 start;
        uint256 end;
    }

    ElectionPhase public phase;

    event LogCurrentElectionPhase(string currentPhase);

    struct ElectionResultStruct {
        string electionName;
        // string candidateFullName;
        // string candidateLName;
        // string candidateGName;
        address[] candidateAddress;
        // uint256 votes;
    }

    address private immutable owner;
    address[] private voted;
    address[] private blacklist;

    // address private AAiTVoteTokenAddress;
    // address private AAiTStudentAddress;
    // address private AAiTElectionTimerAddress;

    mapping(string => ElectionStruct) private electionStructsMapping;
    mapping(address => address[]) private voterToCandidatesMapping;
    // mapping(address => uint256) private voterRemainingVotesMapping;
    string[] private electionIndex;
    ElectionStruct[] private electionValue;
    ElectionStruct[] private completedElections;
    ElectionResultStruct[] private completedElectionResults;
    address[] tempWinners;

    // AAiTElectionHandler electionHandler;
    // AAiTElectionTimer electionTimer;
    // AAiTStudent student;
    AAiTVoteToken voteToken;

    // event LogNewElection(
    //     uint256 index,
    //     string name,
    //     ELECTION_STATUS status,
    //     string startDate,
    //     string endDate,
    //     address[] candidates,
    //     address[] winners,
    //     address[] voters,
    //     address[] voted,
    //     uint256 year,
    //     uint256 section,
    //     DEPTARTMENT_TYPE department
    // );
    // event LogUpdateElection(
    //     uint256 index,
    //     string name,
    //     ELECTION_STATUS status,
    //     string startDate,
    //     string endDate,
    //     address[] candidates,
    //     address[] winners,
    //     address[] voters,
    //     address[] voted,
    //     uint256 year,
    //     uint256 section,
    //     DEPTARTMENT_TYPE department
    // );

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(
        address _AAiTVoteTokenAddress // address _AAiTStudentAddress, // address _AAiTElectionTimerAddress
    ) {
        owner = msg.sender;
        // AAiTVoteTokenAddress = _AAiTVoteTokenAddress;
        // AAiTStudentAddress = _AAiTStudentAddress;
        // AAiTElectionTimerAddress = _AAiTElectionTimerAddress;
        // electionHandler = AAiTElectionHandler(AAiTElectionHandlerAddress);
        // electionTimer = AAiTElectionTimer(_AAiTElectionTimerAddress);
        // student = AAiTStudent(_AAiTStudentAddress);
        voteToken = AAiTVoteToken(_AAiTVoteTokenAddress);
        phase = ElectionPhase(PHASE_NAME.COMPLETED, 0, 0);
    }

    //  REGISTRATION,
    //     REGISTRATION_BREAK,
    //     SECTION_ELECTION,
    //     // SECTION_ELECTION_DONE,
    //     SECTION_ELECTION_BREAK,
    //     BATCH_ELECTION,
    //     BATCH_ELECTION_BREAK,
    //     // BATCH_ELECTION_DONE,
    //     DEPARTMENT_ELECTION,
    //     // DEPARTMENT_ELECTION_DONE,
    //     COMPLETED

    // function changeVal(string memory _newVal) internal {
    //     require(msg.sender == owner, "Only the owner can change the value");
    //     val = _newVal;
    //     // IERC20(token).transferFrom(msg.sender, address(this), amount);
    // }

    // function getPhaseEnd() public view returns (uint256) {
    //     return end;
    // }

    // function startTimer(uint256 _votingDuration, uint256 _breakDuration)
    //     public
    //     onlyOwner
    // {
    //     if (phase.phaseName == PHASE_NAME.COMPLETED) {
    //         votingDuration = _votingDuration;
    //         breakDuration = _breakDuration;
    //         phase = ElectionPhase(
    //             PHASE_NAME.REGISTRATION,
    //             block.timestamp,
    //             block.timestamp + votingDuration
    //         );
    //     }
    // }

    // function stopTimer() public onlyOwner {
    //     phase = ElectionPhase(PHASE_NAME.COMPLETED, 0, 0);
    // }
    function getCurrentPhase() public view returns (ElectionPhase memory) {
        return phase;
    }

    function changePhase(uint256 startDate, uint256 endDate) public onlyOwner {
        // require(msg.sender == owner, "Only the owner can change the phase");

        if (phase.phaseName == PHASE_NAME.DEPARTMENT_ELECTION) {
            phase = ElectionPhase(PHASE_NAME.COMPLETED, 0, 0);
            // changeVal("unos");
            return;
        } else if (phase.phaseName == PHASE_NAME.COMPLETED) {
            phase = ElectionPhase(PHASE_NAME.REGISTRATION, startDate, endDate);
            return;
        }
        // return uint(phase.phaseName)+1;
        phase.phaseName = PHASE_NAME(uint256(phase.phaseName) + 1);
        // phase.phaseName = PHASE_NAME.REGISTRATION_BREAK;
        phase.start = startDate;
        // phase.end = block.timestamp + _newEnd;
        phase.end = endDate;
    }

    function revertPhase(
        uint256 phaseName,
        uint256 startDate,
        uint256 endDate
    ) external onlyOwner {
        if (phaseName == uint256(phase.phaseName)) {
            return;
        } else {
            phase.phaseName = PHASE_NAME(uint256(phase.phaseName));
            phase.start = startDate;
            phase.end = endDate;
            return;
        }
    }

    // function getRemainingTime() external view returns (uint256) {
    //     if (phase.phaseName == PHASE_NAME.COMPLETED) {
    //         return 0;
    //     }
    //     return phase.end - block.timestamp;
    // }

    // ELECTION FUNCTIONS

    function findElectionByName(string memory _name)
        private
        view
        returns (bool)
    {
        for (uint256 i = 0; i < electionValue.length; i++) {
            if (
                keccak256(abi.encodePacked(electionValue[i].name)) ==
                keccak256(abi.encodePacked(_name))
            ) {
                return true;
            }
        }
        return false;
    }

    function findElectionByType(
        uint256 year,
        uint256 section,
        DEPTARTMENT_TYPE department
    ) private view returns (bool) {
        for (uint256 i = 0; i < electionValue.length; i++) {
            if (
                electionValue[i].year == year &&
                electionValue[i].section == section &&
                keccak256(abi.encodePacked(electionValue[i].department)) ==
                keccak256(abi.encodePacked(department))
            ) {
                return true;
            }
        }
        return false;
    }

    // function addElection(
    //     string memory name,
    //     ELECTION_STATUS status,
    //     string memory startDate,
    //     string memory endDate,
    //     address[] memory candidates,
    //     address[] memory voters,
    //     uint256 year,
    //     uint256 section,
    //     DEPTARTMENT_TYPE department
    // ) public {
    //     require(
    //         !findElectionByName(name) ||
    //             !findElectionByType(year, section, department),
    //         "exists"
    //     );

    //     uint256 index = allElections.length;
    //     address[] memory empty;
    //     electionStructsMapping[name] = ElectionStruct(
    //         allElections.length,
    //         name,
    //         status,
    //         startDate,
    //         endDate,
    //         candidates,
    //         empty,
    //         voters,
    //         empty,
    //         year,
    //         section,
    //         department
    //     );
    //     allElections.push(
    //         ElectionStruct({
    //             index: allElections.length,
    //             name: name,
    //             status: status,
    //             startDate: startDate,
    //             endDate: endDate,
    //             candidates: candidates,
    //             winners: empty,
    //             voters: voters,
    //             voted: empty,
    //             year: year,
    //             section: section,
    //             department: department
    //         })
    //     );
    // }

    // function setElectionHandler(address _AAiTElectionHandlerAddress)
    //     public
    //     onlyOwner
    // {
    //     electionHandler = AAiTElectionHandler(_AAiTElectionHandlerAddress);
    // }

    function createElection(
        string memory name,
        uint256 startDate,
        uint256 endDate,
        address[] memory candidates,
        uint256 year,
        uint256 section,
        DEPTARTMENT_TYPE department
    ) external {
        address[] memory empty;
        // electionStructsMapping[name].name =

        require(
            !findElectionByName(name) &&
                !findElectionByType(year, section, department),
            "Election Already Exists"
        );
        electionIndex.push(name);
        ElectionStruct memory tempElection = ElectionStruct(
            electionIndex.length - 1,
            name,
            ELECTION_STATUS.ONGOING,
            startDate,
            endDate,
            candidates,
            empty,
            year,
            section,
            department
        );
        electionStructsMapping[name] = tempElection;
        electionValue.push(tempElection);
        // emit LogNewElection(electionStruct);

        // return electionStruct;
        // revert("Invalid Operation");
        // return true;
    }

    // function retrieveElections() public {
    //     // allElections = ;
    //     delete allElections;
    //     delete electionIndex;
    //     delete electionValue;
    //     // delete electionStructsMapping;
    //     ElectionStruct[] memory temp = electionHandler.getPendingElections();
    //     for (uint256 i = 0; i < temp.length; i++) {
    //         electionStructsMapping[temp[i].name] = temp[i];
    //         allElections.push(temp[i]);
    //         electionIndex.push(temp[i].name);
    //         electionValue.push(temp[i]);
    //         // electionStructsMapping[allElections[i].name] = allElections[i];
    //         // electionIndex.push(allElections[i].name);
    //         // electionValue.push(allElections[i]);
    //     }
    // }

    // function removeElection(string memory name) internal onlyOwner {
    //     require(findElectionByName(name), "No Election");
    // uint256 rowToDelete = electionStructsMapping[name].index;
    // // string memory keyToMove = electionIndex[electionIndex.length - 1];
    // electionIndex[electionStructsMapping[name].index] = electionIndex[
    //     electionIndex.length - 1
    // ];
    // electionStructsMapping[electionIndex[electionIndex.length - 1]]
    //     .index = electionStructsMapping[name].index;

    // electionValue[electionStructsMapping[name].index] = electionValue[
    //     electionValue.length - 1
    // ];
    // electionValue[electionStructsMapping[name].index]
    //     .index = electionStructsMapping[name].index;
    // electionValue.pop();
    // electionIndex.pop();
    // delete allElections[electionStructsMapping[name].index];
    // previousElections.push(
    //     electionStructsMapping[electionIndex[electionIndex.length - 1]]
    // );
    // delete electionStructsMapping[electionIndex[electionIndex.length - 1]];
    // }

    function vote(address voterAddress, address candidateAddress)
        public
        onlyOwner
    {
        // AAiTVoteToken tempToken = AAiTVoteToken(AAiTVoteTokenAddress);
        // AAiTStudent student = AAiTStudent(AAiTStudentAddress);
        // AAiTStudent.VoterStruct memory tempVoter = student.getVoter(
        //     voterAddress
        // );
        // require(voterAddress != address(0), "Invalid Address");
        // require(candidateAddress != address(0), "Invalid Address");
        require(
            voterAddress != owner && candidateAddress != owner,
            "Invalid Operation"
        );
        require(
            voterToCandidatesMapping[voterAddress].length < 2,
            "Voter Already Voted"
        );
        require(
            !AAiTElectionLibrary.contains(blacklist, candidateAddress),
            "Candidate Disqualified"
        );
        require(
            !AAiTElectionLibrary.contains(
                voterToCandidatesMapping[voterAddress],
                candidateAddress
            ),
            "Already Voted For This Candidate"
        );
        // require()

        require(voteToken.balanceOf(voterAddress) > 0, "Insufficient Token");

        for (uint256 i = 0; i < electionValue.length; i++) {
            if (
                AAiTElectionLibrary.contains(
                    electionValue[i].candidates,
                    candidateAddress
                )
            ) {
                if (electionValue[i].status == ELECTION_STATUS.ONGOING) {
                    if (
                        AAiTElectionLibrary.contains(
                            electionValue[i].candidates,
                            voterAddress
                        )
                    ) {
                        candidateVote(voterAddress, candidateAddress);
                        voterToCandidatesMapping[voterAddress].push(
                            candidateAddress
                        );
                        voted.push(voterAddress);
                    } else {
                        require(
                            voterAddress != candidateAddress,
                            "Invalid Operation"
                        );
                        voteToken.transferFrom(
                            voterAddress,
                            candidateAddress,
                            1
                        );
                        voterToCandidatesMapping[voterAddress].push(
                            candidateAddress
                        );

                        voted.push(voterAddress);
                    }

                    return;
                } else {
                    revert("Invalid Phase");
                }
            }
            continue;
        }

        revert("Couldn't Vote");

        // require(
        //     ,
        //     "You have already voted"
        // );
        // moveToVoted(
        //     voterAddress,
        //     getElectionByType(
        //         tempVoter.voterInfo.voterInfo.currentYear,
        //         tempVoter.voterInfo.voterInfo.currentSection,
        //         DEPTARTMENT_TYPE(
        //             uint256(tempVoter.voterInfo.voterInfo.currentDepartment)
        //         )
        //     ).name
        // // );
        // string memory tempName = getElectionByType(
        //     tempVoter.voterInfo.voterInfo.currentYear,
        //     tempVoter.voterInfo.voterInfo.currentSection,
        //     DEPTARTMENT_TYPE(
        //         uint256(tempVoter.voterInfo.voterInfo.currentDepartment)
        //     )
        // ).name;

        // // electionStructsMapping[tempName].voted.push(voterAddress);
        // delete electionStructsMapping[electionName].voters[index];
        // uint256 index = electionStructsMapping[electionName].index;
        // electionValue[electionStructsMapping[tempName].index]
        //     .voted = electionStructsMapping[tempName].voted;
        // allElections[electionStructsMapping[tempName].index]
        //     .voted = electionStructsMapping[tempName].voted;
    }

    function candidateVote(address voterAddress, address candidateAddress)
        public
        onlyOwner
    {
        // AAiTVoteToken tempToken = AAiTVoteToken(AAiTVoteTokenAddress);
        voteToken.mint(1);
        voteToken.transfer(voterAddress, 1);
        voteToken.transferFrom(voterAddress, candidateAddress, 1);
    }

    // function moveToVoted(address voterAddress, address candidateAddress)
    //     internal
    //     onlyOwner
    // {
    //     if (voterRemainingVotesMapping[voterAddress] == 0) {
    //         voted.push(voterAddress);
    //     }
    // }

    // AAiTVoteToken tempToken = AAiTVoteToken(AAiTVoteTokenAddress);

    function extendPhase(uint256 endDate) external onlyOwner {
        phase.end = endDate;        
    }

    function extendElection(string memory electionName, uint256 endDate) external onlyOwner {
        electionStructsMapping[electionName].endDate = endDate;
        electionValue[electionStructsMapping[electionName].index].endDate = endDate;
    }

    function pauseElection(string memory electionName) external onlyOwner {
        electionStructsMapping[electionName].status = ELECTION_STATUS.PENDING;
        electionValue[electionStructsMapping[electionName].index].status = ELECTION_STATUS.PENDING;
    }

    function startElection(string memory electionName) external onlyOwner {
        electionStructsMapping[electionName].status = ELECTION_STATUS.ONGOING;
        electionValue[electionStructsMapping[electionName].index].status = ELECTION_STATUS.ONGOING;
    }

    function completeElection(string memory electionName) public onlyOwner {
        electionStructsMapping[electionName].status = ELECTION_STATUS.COMPLETED;
        electionValue[electionStructsMapping[electionName].index].status = ELECTION_STATUS.COMPLETED;
    }    

    function endElection(string memory electionName) public onlyOwner {
        // electionStructsMapping[electionName].status = ELECTION_STATUS.ENDED;
        // electionValue[electionStructsMapping[electionName].index]
        //     .status = ELECTION_STATUS.ENDED;
        require(findElectionByName(electionName), "Election Does Not Exist");
        declareWinner(electionName);
        // completedElections.push(electionStructsMapping[electionName]);
        // completedElectionResults.push(
        //     ElectionResultStruct(
        //         electionName,
        //         getElectionByName(electionName).candidates
        //     )
        // );
        // removeElection(electionName);
    }

    function removeElection(string memory electionName) public onlyOwner {        
        require(findElectionByName(electionName), "Election Does Not Exist");

        uint256 rowToDelete = electionStructsMapping[electionName].index;
        string memory keyToMove = electionIndex[electionIndex.length - 1];
        electionIndex[rowToDelete] = keyToMove;
        electionStructsMapping[keyToMove].index = rowToDelete;
        electionIndex.pop();
        electionValue[rowToDelete] = electionValue[electionValue.length - 1];
        electionValue.pop();
    }

    function removeVotesRemainingForVoters(address[] memory voters) public onlyOwner {
        for (uint256 i = 0; i < voters.length; i++) {
            delete voterToCandidatesMapping[voters[i]];
            if(AAiTElectionLibrary.contains(voted, voters[i])){
                delete voted[AAiTElectionLibrary.indexOf(voted, voters[i])];
            }
        }

    }

    function removeAllCompletedElections() external onlyOwner {
        delete completedElections;
        // delete electionStructsMapping;
        delete electionValue;
        delete electionIndex;
        // delete voterRemainingVotesMapping;
        for (uint256 i = 0; i < voted.length; i++) {
            delete voterToCandidatesMapping[voted[i]];
        }
        delete voted;
    }

    function declareWinner(string memory electionName) internal {
        // AAiTVoteToken tempToken = AAiTVoteToken(AAiTVoteTokenAddress);
        ElectionStruct memory temp = electionStructsMapping[electionName];
        delete tempWinners;
        uint256[] memory tempVoteCount = new uint256[](temp.candidates.length);
        for (uint256 i = 0; i < temp.candidates.length; i++) {
            tempVoteCount[i] = voteToken.balanceOf(temp.candidates[i]);
            // tempVoteCount.push(tempToken.balanceOf(temp.candidates[i]));
        }
        uint256 max = AAiTElectionLibrary.findLargest(tempVoteCount);
        for (uint256 i = 0; i < temp.candidates.length; i++) {
            if (tempVoteCount[i] == max) {
                // winners[i] = temp.candidates[i];
                tempWinners.push(temp.candidates[i]);
            }
        }

        temp.winners = tempWinners;
        temp.status = ELECTION_STATUS.COMPLETED;

        electionStructsMapping[electionName] = temp;
        electionValue[electionStructsMapping[electionName].index] = temp;
        // allElections[electionStructsMapping[electionName].index] = temp;

        // sort candidates
        // uint256[] memory sortedCandidates = temp.candidates;

        // removeElection(electionName);

        // uint256 index = electionStructsMapping[electionName].index;
        // uint256 winnerIndex = electionStructsMapping[electionName].winners.length;
        // electionStructsMapping[electionName].winners.push(electionStructsMapping[electionName].candidates[winnerIndex]);
    }

    function blacklistCandidate(address candidateAddress) public onlyOwner {
        // AAiTStudent student = AAiTStudent(AAiTStudentAddress);
        // AAiTStudent.CandidateStruct memory tempCandidate = student.getCandidate(
        //     candidateAddress
        // );
        // ElectionStruct[] memory tempElection = allElections;
        require(
            !AAiTElectionLibrary.contains(blacklist, candidateAddress),
            "Candidate already blacklisted"
        );
        for (uint256 i = 0; i < electionValue.length; i++) {
            if (
                AAiTElectionLibrary.contains(
                    electionValue[i].candidates,
                    candidateAddress
                )
            ) {
                uint256 index = AAiTElectionLibrary.indexOf(
                    electionValue[i].candidates,
                    candidateAddress
                );

                // require(index < electionValue[i].candidates.length);
                electionValue[i].candidates[index] = electionValue[i]
                    .candidates[electionValue[i].candidates.length - 1];
                electionValue[i].candidates.pop();
                electionStructsMapping[electionValue[i].name]
                    .candidates = electionValue[i].candidates;

                // student.removeCandidate(
                //     // tempCandidate.candidateInfo.candidateInfo.fName,
                //     // tempCandidate.candidateInfo.candidateInfo.lName,
                //     // tempCandidate.candidateInfo.candidateInfo.gName,
                //     candidateAddress
                // );

                blacklist.push(candidateAddress);
                // return true;
            }
        }
        // revert("Invalid Operation");
    }

    function burnAllTokens(address[] memory users) public onlyOwner {
        // AAiTVoteToken tempToken = AAiTVoteToken(AAiTVoteTokenAddress);
        // AAiTStudent tempStudent = AAiTStudent(AAiTStudentAddress);
        // AAiTStudent.CandidateStruct[] memory tempCandidate = student
        //     .getAllCandidates();
        // AAiTStudent.VoterStruct[] memory tempVoter = student.getAllVoters();
        for (uint256 i = 0; i < users.length; i++) {
            voteToken.burn(users[i]);
        }

        voteToken.burn(owner);
        // temp.burnRemainingTokens(owner);
    }

    function mintAndSendTokens(address[] memory voters) public onlyOwner {
        // AAiTVoteToken tempToken = AAiTVoteToken(AAiTVoteTokenAddress);
        // AAiTStudent tempStudent = AAiTStudent(AAiTStudentAddress);
        // AAiTStudent.VoterStruct[] memory tempVoters = student.getAllVoters();
        // uint256 totalTokenCount = tempVoters.length;
        voteToken.mint((voters.length) * 2);
        for (uint256 i = 0; i < voters.length; i++) {
            voteToken.transfer(voters[i], 2);
        }
    }

    // function endElection(string memory electionName) public onlyOwner {
    //     declareWinner(electionName);
    //     removeElection(electionName);
    // }

    // function getElectionResult(string memory electionName)
    //     public
    //     view
    //     returns (ElectionResultStruct[] memory)
    // {
    //     // ElectionStruct memory temp = electionStructsMapping[electionName];
    //     ElectionResultStruct[] memory result = new ElectionResultStruct[](
    //         electionStructsMapping[electionName].candidates.length
    //     );
    //     // AAiTVoteToken tempToken = AAiTVoteToken(AAiTVoteTokenAddress);
    //     // AAiTStudent student = AAiTStudent(AAiTStudentAddress);

    //     for (
    //         uint256 i = 0;
    //         i < electionStructsMapping[electionName].candidates.length;
    //         i++
    //     ) {
    //         AAiTStudent.CandidateStruct memory tempCandidate = student
    //             .getCandidate(
    //                 electionStructsMapping[electionName].candidates[i]
    //             );
    //         ElectionResultStruct memory tempResult = ElectionResultStruct(
    //             tempCandidate.candidateInfo.candidateInfo.fullName,
    //             // tempCandidate.candidateInfo.candidateInfo.lName,
    //             // tempCandidate.candidateInfo.candidateInfo.gName,
    //             electionStructsMapping[electionName].candidates[i],
    //             voteToken.balanceOf(
    //                 electionStructsMapping[electionName].candidates[i]
    //             )
    //         );
    //         result[i] = tempResult;
    //     }
    //     return result;
    // }

    // function goToNextPhase() public onlyOwner {
    //     AAiTElectionTimer.ElectionPhase memory tempPhase = electionTimer
    //         .getCurrentPhase();
    //     if (tempPhase.phaseName == AAiTElectionTimer.PHASE_NAME.REGISTRATION) {
    //         electionTimer.changePhase();
    //         // electionTimer.goToNextPhase();
    //     } else if (
    //         tempPhase.phaseName ==
    //         AAiTElectionTimer.PHASE_NAME.REGISTRATION_BREAK
    //     ) {
    //         electionTimer.changePhase();
    //         // electionHandler.generateElectionsPerPhase();
    //         // retrieveElections();
    //         // electionHandler.mintAndSendTokens();
    //     } else if (
    //         tempPhase.phaseName == AAiTElectionTimer.PHASE_NAME.SECTION_ELECTION
    //     ) {
    //         electionTimer.changePhase();
    //         electionHandler.endAllOngoingElections();
    //         electionHandler.burnAllTokens();
    //     } else if (
    //         tempPhase.phaseName ==
    //         AAiTElectionTimer.PHASE_NAME.SECTION_ELECTION_BREAK
    //     ) {
    //         electionTimer.changePhase();
    //         retrieveElections();
    //         electionHandler.mintAndSendTokens();
    //     } else if (
    //         tempPhase.phaseName == AAiTElectionTimer.PHASE_NAME.BATCH_ELECTION
    //     ) {
    //         electionTimer.changePhase();
    //         electionHandler.endAllOngoingElections();
    //         electionHandler.burnAllTokens();
    //     } else if (
    //         tempPhase.phaseName ==
    //         AAiTElectionTimer.PHASE_NAME.BATCH_ELECTION_BREAK
    //     ) {
    //         electionTimer.changePhase();
    //         retrieveElections();
    //         electionHandler.mintAndSendTokens();
    //     } else if (
    //         tempPhase.phaseName ==
    //         AAiTElectionTimer.PHASE_NAME.DEPARTMENT_ELECTION
    //     ) {
    //         electionTimer.changePhase();
    //         electionHandler.endAllOngoingElections();
    //         electionHandler.burnAllTokens();
    //     } else if (
    //         tempPhase.phaseName == AAiTElectionTimer.PHASE_NAME.COMPLETED
    //     ) {
    //         electionTimer.changePhase();
    //     } else {
    //         revert("Invalid Operation");
    //     }
    // }

    // function moveToVoted(address voterAddress, string memory electionName)
    //     private
    // {
    //     // uint256 index = electionStructsMapping[electionName].index;

    //     electionStructsMapping[electionName].voted.push(voterAddress);
    //     // delete electionStructsMapping[electionName].voters[index];
    //     // uint256 index = electionStructsMapping[electionName].index;
    //     electionValue[electionStructsMapping[electionName].index]
    //         .voted = electionStructsMapping[electionName].voted;
    //     // emit LogUpdateElection(
    //     //     index,
    //     //     electionStructsMapping[electionName].name,
    //     //     electionStructsMapping[electionName].status,
    //     //     electionStructsMapping[electionName].startDate,
    //     //     electionStructsMapping[electionName].endDate,
    //     //     electionStructsMapping[electionName].candidates,
    //     //     electionStructsMapping[electionName].winners,
    //     //     electionStructsMapping[electionName].voters,
    //     //     electionStructsMapping[electionName].voted,
    //     //     electionStructsMapping[electionName].year,
    //     //     electionStructsMapping[electionName].section,
    //     //     electionStructsMapping[electionName].department
    //     // );
    // }

    // GET FUNCTIONS

    function getVotesRemaining(address voterAddress)
        external
        view
        returns (uint256)
    {
        return voterToCandidatesMapping[voterAddress].length;
    }

    function getAllCurrentElections()
        public
        view
        returns (ElectionStruct[] memory)
    {
        return electionValue;
    }

    function getAllCompletedElections()
        public
        view
        returns (ElectionStruct[] memory)
    {
        return completedElections;
    }

    function getElectionByName(string memory electionName)
        public
        view
        returns (ElectionStruct memory)
    {
        require(findElectionByName(electionName), "Election not found");
        return electionStructsMapping[electionName];
    }

    function getElectionStatus(string memory electionName)
        public
        view
        returns (uint256 status)
    {
        require(findElectionByName(electionName), "Election not found");
        return uint256(electionStructsMapping[electionName].status);
    }

    function getElectionEndDate(string memory electionName)
        public
        view
        returns (uint256)
    {
        require(findElectionByName(electionName), "Election not found");
        return electionStructsMapping[electionName].endDate;
    }

    // function getElectionByType(
    //     uint256 year,
    //     uint256 section,
    //     DEPTARTMENT_TYPE department
    // ) public view returns (ElectionStruct memory result) {
    //     require(
    //         findElectionByType(year, section, department),
    //         "Election not found"
    //     );
    //     // AAiTElectionTimer electionTimer = AAiTElectionTimer(
    //     //     AAiTElectionTimerAddress
    //     // );
    //     // AAiTElection tempElection = AAiTElection(AAiTElectionAddress);
    //     // AAiTElection.ElectionStruct[] memory allElections = tempElection
    //     //     .getAllElections();
    //     // ElectionPhase memory phase = getCurrentPhase();
    //     if (
    //         phase.phaseName == PHASE_NAME.DEPARTMENT_ELECTION
    //         // ||
    //         // phase.phaseName ==
    //         // PHASE_NAME.DEPARTMENT_ELECTION_DONE
    //     ) {
    //         for (uint256 i = 0; i < electionValue.length; i++) {
    //             if (electionValue[i].department == department) {
    //                 return electionValue[i];
    //             }
    //         }
    //     } else if (
    //         phase.phaseName == PHASE_NAME.BATCH_ELECTION
    //         // ||
    //         // phase.phaseName ==
    //         // PHASE_NAME.BATCH_ELECTION_DONE
    //     ) {
    //         for (uint256 i = 0; i < electionValue.length; i++) {
    //             if (
    //                 electionValue[i].department == department &&
    //                 electionValue[i].year == year
    //             ) {
    //                 return electionValue[i];
    //             }
    //         }
    //     } else if (
    //         phase.phaseName == PHASE_NAME.SECTION_ELECTION
    //         // ||
    //         // phase.phaseName ==
    //         // PHASE_NAME.SECTION_ELECTION_DONE
    //     ) {
    //         for (uint256 i = 0; i < electionValue.length; i++) {
    //             if (
    //                 electionValue[i].department == department &&
    //                 electionValue[i].year == year &&
    //                 electionValue[i].section == section
    //             ) {
    //                 return electionValue[i];
    //             }
    //         }
    //     } else {
    //         revert("Invalid Operation");
    //     }
    // }
}
