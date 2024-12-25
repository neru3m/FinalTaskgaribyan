// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingContract {
    // Массив кандидатов
    string[] public candidates;

    // Маппинг для голосов
    mapping(string => uint256) public votes;

    // Конструктор, который принимает список кандидатов
    constructor(string[] memory _candidates) {
        candidates = _candidates;
    }

    // Функция для голосования
    function vote(string memory _candidate) public {
        votes[_candidate]++;
    }

    // Функция для получения всех кандидатов
    function getCandidates() public view returns (string[] memory) {
        return candidates;
    }
}
