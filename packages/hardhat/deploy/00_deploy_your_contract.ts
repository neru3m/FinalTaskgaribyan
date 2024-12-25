import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Функция для деплоя контракта VotingContract.
 * Здесь указываются адрес деплойера и список кандидатов.
 *
 * @param hre - объект среды выполнения Hardhat.
 */
const deployVoting: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments, ethers } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  // Определяем список кандидатов для голосования
  const participantList = ["Aleks", "Dima", "Petr", "Ivan"];

  // Деплоим контракт VotingContract с параметрами конструктора
  const deploymentResult = await deploy("VotingContract", {
    from: deployer,
    args: [participantList], // Передаём список кандидатов в конструктор
    log: true,
    autoMine: true, // Автоматически майним транзакцию
  });

  // Получаем развернутый контракт для дальнейшего взаимодействия
  const contractInstance: Contract = await ethers.getContract("VotingContract", deployer);
  console.log("📜 Контракт успешно развернут!");
  console.log("📋 Список кандидатов для голосования:", await contractInstance.getCandidates());
};

export default deployVoting;

// Добавляем тег для упрощения идентификации задачи при деплое
deployVoting.tags = ["VotingDeployment"];
