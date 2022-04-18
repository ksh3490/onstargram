pragma solidity 0.8.13;

import "./ERC721/ERC721.sol";
import "./ERC721/ERC721Enumerable.sol";

contract Onstargram is ERC721, ERC721Enumerable {
    event PhotoUploaded(
        uint256 indexed tokenId,
        bytes photo,
        string title,
        string location,
        string description,
        uint256 timestamp
    );

    mapping(uint256 => PhotoData) private _photoList;

    struct PhotoData {
        uint256 tokenId;
        address[] ownerHistory;
        bytes photo;
        string title;
        string location;
        string description;
        uint256 timestamp;
    }

    function uploadPhoto(
        bytes memory photo,
        string memory title,
        string memory location,
        string memory description
    ) public {
        uint256 tokenId = totalSupply() + 1;

        _mint(msg.sender, tokenId);

        address[] memory ownerHistory;

        PhotoData memory newPhotoData = PhotoData({
            tokenId: tokenId,
            ownerHistory: ownerHistory,
            photo: photo,
            title: title,
            location: location,
            description: description,
            timestamp: now
        });

        _photoList[tokenId] = newPhotoData;
        _photoList[tokenId].ownerHistory.push(msg.sender);

        emit PhotoUploaded(
            tokenId,
            photo,
            title,
            location,
            description,
            timestamp
        );
    }
}
